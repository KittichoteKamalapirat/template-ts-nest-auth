import { User } from "../resources/users/entities/user.entity";
import { UserSubscriber } from "../resources/users/entities/user.subscriber";

export const typeormConfigNest = {
  type: "postgres" as const,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User],
  subscribers: [UserSubscriber],
  synchronize: true,
  // logging: !IS_PROD,
  // synchronize: true,
  logging: false, // log if not prod
};
