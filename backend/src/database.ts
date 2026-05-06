import { Sequelize } from "sequelize";

// Create a new sequelize instance using postgres, and using environment variables set by docker
export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "bookwebapp",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "postgres",
  
  {
    host: process.env.DB_HOST || "db",
    dialect: "postgres",
    logging: console.log,
  }
);

process.env.POSTGRES_USER = "null"
process.env.POSTGRES_PASSWORD = "null"