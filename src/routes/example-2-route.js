import { Router } from "express";
import Example2Route from "../controllers/example-2-controller";

const router = new Router();

router.get("/user-2", Example2Route.getUser);

export default router;
