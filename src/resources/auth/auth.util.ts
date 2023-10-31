import ErrorResponse from "../../types/error-response.input";
import { CreateUserInput } from "../users/dto/create-user.input";

export const validateRegister = (data: CreateUserInput) => {
  if (!data.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (data.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Length must be greater than 2",
      },
    ];
  }
  // if there is not errors, return null
  return null;
};

export const getRegisterErrorMessage = (error: any): ErrorResponse => {
  if (error?.detail?.includes("email")) {
    return {
      errors: [
        {
          field: "email",
          message: "email already taken",
        },
      ],
    };
  }

  return {
    errors: [
      {
        field: "user",
        message: "Unknown Error",
      },
    ],
  };
};
