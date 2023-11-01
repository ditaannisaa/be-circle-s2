import UserService from "../services/UserService";
import {Request, Response} from 'express';

export default new (class UserController {
    find(req: Request, res: Response) {
        UserService.find(req, res);
    };

    create(req: Request, res: Response) {
        UserService.create(req, res);
    }

    findOne(req: Request, res: Response) {
        UserService.findOne(req, res);
    }

    update(req: Request, res: Response) {
        UserService.update(req, res);
    }

    delete(req: Request, res: Response) {
        UserService.delete(req, res);
    }
}
)