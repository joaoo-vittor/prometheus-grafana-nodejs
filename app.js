import dotenv from 'dotenv';

dotenv.config();

import express from "express";

import exampleRouter from "./src/routes/example-route";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
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
  }
}

export default new App().app;
