import { Request, Response} from 'express'
import ThreadService from '../services/ThreadService'

export default new (class ThreadController {
    find(req: Request, res: Response) {
        ThreadService.find(req, res)
    }

    findOne(req: Request, res: Response) {
        ThreadService.findOne(req, res)
    }

    create(req: Request, res: Response) {
        ThreadService.create(req, res)
    }

    update(req: Request, res: Response) {
        ThreadService.update(req, res)
    }

    delete(req: Request, res: Response) {
        ThreadService.delete(req, res)
    }
})