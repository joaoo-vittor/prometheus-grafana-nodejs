import dotenv from "dotenv";
import { collectDefaultMetrics, register } from "prom-client";

dotenv.config();

import express from "express";

import exampleRouter from "./src/routes/example-route";
import example2Router from "./src/routes/example-2-route";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    collectDefaultMetrics({ register });
  }

  middlewares() {
    // Your middlewares
    // Example:
    // this.app.use(cors(Options));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    // Your Routes
    // Example:
    this.app.use("/", exampleRouter);
    this.app.use("/", example2Router);
    this.app.use("/metrics", async (req, res) => {
      res.set("Content-Type", register.contentType);
      res.end(await register.metrics());
    });
  }
}

export default new App().app;
