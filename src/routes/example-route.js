import { Router } from "express";
import ExampleRoute from "../controllers/example-controller";

const router = new Router();

router.get("/user", ExampleRoute.getUser);

export default router;
