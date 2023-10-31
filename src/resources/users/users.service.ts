import { Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Repository } from "typeorm";
import { AppService } from "../../app.service";
import BooleanResponse from "../../types/boolean-response.input";
import { RequestWithSession } from "../../types/context.type";
import { AuthService } from "../auth/auth.service";

import { CreateUserInput } from "./dto/create-user.input";

import { COOKIE_NAME, IS_PROD } from "../../constants";
import { getErrorResponse } from "../../utils/getErrorResponse";
import { CreateUserDbInput } from "./dto/create-user-db.input";
import UserResponse from "./dto/user-response";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async create(input: CreateUserDbInput): Promise<UserResponse> {
    try {
      const existing = await this.findOneByEmail(input.email);
      if (existing) {
        return getErrorResponse("email", "Email already taken");
      }

      const newUser = this.usersRepository.create({ ...input });
      const savedUser = await this.usersRepository.save(newUser);

      return { user: savedUser };
    } catch (error) {
      return getErrorResponse("error", "Unknown error");
    }
  }

  async createOrFind(input: CreateUserInput): Promise<UserResponse> {
    try {
      const existing = await this.findOneByEmail(input.email);
      if (existing) {
        return { user: existing }; // return the first team
      }

      const newUser = this.usersRepository.create({ ...input });
      const savedUser = await this.usersRepository.save(newUser);

      return { user: savedUser };
    } catch (error) {
      console.error("error createOrFindUser", error);
      if (error.detail?.includes("email")) {
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // remove user
  // remove cookie in frontend (actually frontend does that too I think)
  async remove(
    id: string,
    req: RequestWithSession,
    res: Response
  ): Promise<BooleanResponse> {
    try {
      const user = await this.findOne(id);
      if (!user) return getErrorResponse("user", "Cannot find the user");

      await this.usersRepository.delete(id); // delete a user

      return new Promise((resolve) => {
        req.session.destroy((err) => {
          res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            sameSite: "lax",
            secure: IS_PROD,
          });
          if (err) {
            console.error(err);
            resolve({ value: false });
            return;
          }
          resolve({ value: true }); // logged out
        });
      });
    } catch (error) {
      return getErrorResponse("user", "Unknown Error");
    }
  }
}
