import Express from "express";
import TestRoute from "./routes/book.route";
import cors from "cors";
import session from "express-session";
import { sequelize } from "./database";

export const Server = () => {
  const app: Express.Application = Express();
  const port: number = 3000;

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(Express.json());
  app.use(cors());
  app.use("/v1/", TestRoute);

  sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

Server();
