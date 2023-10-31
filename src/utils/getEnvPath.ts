export type Env = "development" | "production" | "localhost";

export const getEnvPath = () => {
  const env = process.env.NODE_ENV as Env;
  switch (env) {
    case "development":
      return ".env.development";
    case "production":
      return ".env.production";
    case "localhost":
      return ".env.localhost";
    default:
      const _unreachable: never = env;
      throw `Unexpected NODE_ENV value: ${_unreachable}`;
  }
};
