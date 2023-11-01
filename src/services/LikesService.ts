import { Repository } from "typeorm"
import {Likes} from "../entities/Likes"
import { AppDataSource } from "../data-source";
import {Request, Response} from "express"
import {LikesSchemaValidate} from "../utils/validate/LikesSchema"

export default new (class LikesService {
    private readonly LikesRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const likes = await this.LikesRepository.find({
                relations: {
                    user: true,
                    thread: true
                }
            })

            return res.status(200).json(likes)
        } catch (err) {
            return res.status(500).json({error: "Cannot find Likes"})
        }
    }

    async findOne(req: Request, res:Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id)
            const findLike = await this.LikesRepository.findOneBy({id})

            return res.status(200).json(findLike)
        } catch (error) {
            return res.status(500).json({error: "cannot find like"})
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const body = req.body
            const {error} = LikesSchemaValidate.validate(body)

            if (error) {
                return res.status(400).json({error})
            }

            const newLike = this.LikesRepository.create(body)

            await this.LikesRepository.save(newLike)
            return res.status(200).json({data: newLike})
        } catch (err) {
            return res.status(500).json({error: "Cannot create"})
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = Number(req.params.id)
            const findLikestoDelete = await this.LikesRepository.findOneBy({id})

            if (!findLikestoDelete) {
                return res.status(400).json({error: "cannot find like"})
            }

            await this.LikesRepository.remove(findLikestoDelete)
            return res.status(201).json({data: findLikestoDelete})
        } catch(err) {
            return res.status(500).json({error: "cannot delete"})
        }
    }
})