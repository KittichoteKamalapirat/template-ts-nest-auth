import { Env } from "./getEnvPath";

export const getEnvRelativePath = () => {
  const NODE_ENV = process.env.NODE_ENV as Env;
  if (!NODE_ENV) return `${__dirname}/../../.env.development`;

  switch (NODE_ENV) {
    case "development":
      return `${__dirname}/../../.env.development`;
    case "production":
      return `${__dirname}/../../.env.production`;
    case "localhost":
      return `${__dirname}/../../.env.localhost`;
    default:
      const _unreachable: never = NODE_ENV;
      throw `Unexpected NODE_ENV value: ${_unreachable}`;
  }
};
