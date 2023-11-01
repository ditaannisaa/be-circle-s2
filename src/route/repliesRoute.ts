import * as express from "express";
import RepliesController from "../controllers/RepliesController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/replies", RepliesController.find);
router.post("/reply", AuthMiddleware.Authentication, RepliesController.create);
router.get("/reply/:id", RepliesController.findOne);
router.patch(
  "/reply/:id",
  AuthMiddleware.Authentication,
  RepliesController.update
);
router.delete(
  "/reply/:id",
  AuthMiddleware.Authentication,
  RepliesController.delete
);

export default router;
