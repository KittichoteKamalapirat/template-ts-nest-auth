import * as bodyParser from "body-parser";

import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { AppModule } from "./app.module";
import { COOKIE_NAME, IS_PROD } from "./constants";
import rawBodyMiddleware from "./middlewares/rawBody.middleware";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1);

  // Increase the payload size limit (e.g., 50MB)

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.enableCors({
    origin: ["http://localhost:19006", process.env.CORS_ORIGIN],
    // origin: false,
    credentials: true,
  });

  app.use(rawBodyMiddleware()); // for Stripe

  app.use(
    session({
      name: COOKIE_NAME, // TODO add dot env
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: IS_PROD,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  console.log("process.env.PORT", process.env.PORT);
  await app.listen(process.env.PORT);
}

bootstrap();
