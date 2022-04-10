import { Router } from "express";
import ExampleRoute from "../controllers/example-controller";

const router = new Router();

router.get("/", ExampleRoute.index);

export default router;
