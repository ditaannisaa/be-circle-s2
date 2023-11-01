import * as express from "express";
import ThreadsController from "../controllers/ThreadsController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UploadFiles from "../middlewares/UploadFiles";

const router = express.Router();

router.get("/threads", AuthMiddleware.Authentication, ThreadsController.find);
router.get(
  "/thread/:id",
  AuthMiddleware.Authentication,
  ThreadsController.findOne
);
router.post(
  "/thread",
  AuthMiddleware.Authentication,
  UploadFiles.Upload("image"),
  ThreadsController.create
);
router.patch(
  "/thread/:id",
  AuthMiddleware.Authentication,
  ThreadsController.update
);
router.delete(
  "/thread/:id",
  AuthMiddleware.Authentication,
  ThreadsController.delete
);

export default router;
