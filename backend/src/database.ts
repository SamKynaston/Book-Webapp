import { Sequelize } from "sequelize";

// Database
export const sequelize = new Sequelize("bookwebapp", "sam", "", {
  host: "host.docker.internal",
  dialect: "postgres",
  logging: console.log,
});
