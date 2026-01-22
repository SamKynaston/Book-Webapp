import Express from "express";
import TestRoute from "./routes/test.route";

export const Server = () => {
  const app: Express.Application = Express();
  const port: number = 3000;

  app.use("/v1/", TestRoute);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

Server();
