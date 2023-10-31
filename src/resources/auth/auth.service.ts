import { forwardRef, Inject, Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { COOKIE_NAME, IS_PROD } from "../../constants";
import { MyContext, RequestWithSession } from "../../types/context.type";

import BooleanResponse from "../../types/boolean-response.input";
import { getErrorResponse } from "../../utils/getErrorResponse";
import { CreateUserDbInput } from "../users/dto/create-user-db.input";
import { CreateUserInput } from "../users/dto/create-user.input";
import UserResponse from "../users/dto/user-response";
import { UsersService } from "../users/users.service";
import { getRegisterErrorMessage, validateRegister } from "./auth.util";
import { GoogleLoginInput } from "./dto/googleLogin.input";
import { LoginInput } from "./dto/login.input";

interface AppleUserInfoResponse {
  iss: string;
  aud: string;
  exp: number; // unix
  iat: number; // unix
  sub: string;
  c_hash: string;
  email: string;
  email_verified: string; // 'true'
  auth_time: number; // unix
  nonce_supported: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  async guestLogin(req: RequestWithSession): Promise<UserResponse> {
    const uuid = v4();
    try {
      const input = {
        id: uuid,
        isGuest: true,
        email: uuid,
        password: uuid,
      };
      const { user } = await this.usersService.createOrFind(input);
      req.session.userId = user.id;

      return { user };
    } catch (error) {
      console.error("err", error);
      return getErrorResponse("guest", "Cannot log in as a guest");
    }
  }

  async register(
    input: CreateUserInput,
    req: RequestWithSession
  ): Promise<UserResponse> {
    const errors = validateRegister(input);

    if (errors) {
      // if no error, return null as defined
      return { errors };
    }

    const { email, password } = input;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const input: CreateUserDbInput = {
        email,
        password: hash,
        isGuest: false,
      };

      const { user, errors } = await this.usersService.create(input);
      if (errors) return { errors };

      req.session.userId = user.id;

      return { user };
    } catch (error) {
      return getRegisterErrorMessage(error);
    }
  }

  async login(
    { email, password }: LoginInput,
    req: RequestWithSession
  ): Promise<UserResponse> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return getErrorResponse("email", "The email does not exist");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return getErrorResponse("password", "Incorrect password");
    }
    req.session.userId = user.id;

    return { user };
  }

  // google
  async logout({ req, res }: MyContext): Promise<BooleanResponse> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME, {
          httpOnly: true,
          sameSite: "lax",
          secure: IS_PROD,
        });

        // oauth2Client.revokeToken(tokens.refresh_token);
        if (err) {
          resolve({ value: false });

          return;
        }
        resolve({ value: true }); // logged out
      });
    });
  }

  async googleLogIn(input: GoogleLoginInput): Promise<UserResponse> {
    try {
      const { email, photoUrl } = input;

      const userResponse = await this.usersService.createOrFind({
        email,
        photoUrl,
      });
      return { user: userResponse.user };
    } catch (error) {
      return {
        errors: [
          {
            field: "email",
            message: "email already taken",
          },
        ],
      };
    }
  }
  async appleLogIn(token: string): Promise<UserResponse> {
    try {
      // get user info
      const decoded: AppleUserInfoResponse = jwt.decode(token);
      const { email } = decoded;
      const userResponse = await this.usersService.createOrFind({
        email,
      });
      return { user: userResponse.user };
    } catch (error) {
      return {
        errors: [
          {
            field: "email",
            message: "email already taken",
          },
        ],
      };
    }
  }
}
