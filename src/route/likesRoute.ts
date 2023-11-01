import * as express from "express";
import LikesController from "../controllers/LikesController";

const router = express.Router();

router.get('/likes', LikesController.find)
router.get('/like/:id', LikesController.findOne)
router.post('/like', LikesController.create)
router.delete('/like/:id', LikesController.delete)

export default router;