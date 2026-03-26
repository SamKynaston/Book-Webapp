import Express from "express";
import BookRoute from "./routes/book.route";
import AuthorRoute from "./routes/author.route";
import UserRoute from "./routes/users.route";

import cors from "cors";
import session from "express-session";
import { sequelize } from "./database";
import { seedSampleData } from "./sample"

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
  app.use("/v1/books", BookRoute);
  app.use("/v1/authors", AuthorRoute);
  app.use("/v1/users", UserRoute);

  sequelize.sync({ alter: true }).then(() => {
    if (process.env.ENVIRONMENT === "DEVELOPMENT") {
      console.log("Inside of development environment, inserting sample data.")
      seedSampleData();
    }
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
};

Server();
