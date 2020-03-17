import errorHandler from "errorhandler";
import { getConnectionOptions, createConnection, BaseEntity } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

import app from "./app";



const server = async () => {
  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());

  /**
   * Start Express server.
   */
  app.listen(app.get("port"), () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
  });
};

server();
