import Express from "express";
import TestRoute from "./routes/test.route";
import cors from "cors";

export const Server = () => {
  const app: Express.Application = Express();
  const port: number = 3000;

  app.use(cors());
  app.use("/v1/", TestRoute);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

Server();
