import * as express from "express";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", AuthMiddleware.Authentication, AuthController.check);

export default router;
