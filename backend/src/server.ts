import Express from "express";
import BookRoute from "./routes/book.route";
import AuthorRoute from "./routes/author.route";
import UserRoute from "./routes/users.route";
import InventoryRoute from "./routes/inventory.route";

import cors from "cors";
import session from "express-session";
import { sequelize } from "./database";
import { seedSampleData } from "./sample"
import cookieParser from "cookie-parser";

// Creates and exports a new server function
export const Server = () => {
  // Creates a new app using express, opening the backend on port 3000
  const app: Express.Application = Express();
  const port: number = 3000;
  
  // Use the cookieParser middleware in order to ensure cookie-based controllers work
  app.use(cookieParser());
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    }),
  );

  // Automatically set all requests to json
  app.use(Express.json());
  
  // If in development, set cors origin so local ips work
  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        return callback(null, origin);
      },
      credentials: true
    }));
  } else {
    // Otherwise, expect requests from a specified domain
    app.use(cors({
      origin: ["https://bookwebapp.com"],
      credentials: true
    }));
  }
  
  // Sets the routes for each router, which in turn then calls required controllers and middleware
  // These are all V1 routes, which allows for the potential to use V2, V3, etc routes
  app.use("/v1/books", BookRoute);
  app.use("/v1/authors", AuthorRoute);
  app.use("/v1/users", UserRoute);
  app.use("/v1/inventory", InventoryRoute);
  
  // Set the database up, if in development then call the sample data function.
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
