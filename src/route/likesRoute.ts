import * as express from "express";
import LikesController from "../controllers/LikesController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/likes", LikesController.find);
router.get("/like/:id", AuthMiddleware.Authentication, LikesController.findOne);
router.post("/like", AuthMiddleware.Authentication, LikesController.create);
router.delete(
  "/like/:id",
  AuthMiddleware.Authentication,
  LikesController.delete
);

export default router;
