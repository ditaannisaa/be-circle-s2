import * as express from "express";
import UserControllers from "../controllers/UserControllers";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/users", AuthMiddleware.Authentication, UserControllers.find);
router.post("/user", AuthMiddleware.Authentication, UserControllers.create);
router.get("/user/:id", AuthMiddleware.Authentication, UserControllers.findOne);
router.patch(
  "/user/:id",
  AuthMiddleware.Authentication,
  UserControllers.update
);
router.delete(
  "/user/:id",
  AuthMiddleware.Authentication,
  UserControllers.delete
);
router.post("/follow", AuthMiddleware.Authentication, UserControllers.follow);

export default router;
