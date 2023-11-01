import FollowService from "../services/FollowService";
import { Request, Response } from "express";

export default new (class RepliesController {
  find(req: Request, res: Response) {
    FollowService.find(req, res);
  }

  create(req: Request, res: Response) {
    FollowService.create(req, res);
  }
})();
