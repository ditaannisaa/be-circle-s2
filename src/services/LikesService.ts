import { Repository } from "typeorm";
import { Likes } from "../entities/Likes";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { LikesSchemaValidate } from "../utils/validate/LikesSchema";

export default new (class LikesService {
  private readonly LikesRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const likes = await this.LikesRepository.find({
        relations: {
          user: true,
          thread: true,
        },
      });

      return res.status(200).json(likes);
    } catch (err) {
      return res.status(500).json({ error: "Cannot find Likes" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const loginSession = res.locals.loginSession;
      const findLike = await this.LikesRepository.findOne({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id,
          },
        },
      });

      console.log(findLike);

      return res.status(200).json(findLike);
    } catch (error) {
      return res.status(500).json({ error: "cannot find like" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      const { error } = LikesSchemaValidate.validate(body);

      if (error) {
        return res.status(400).json({ error });
      }
      const loginSession = res.locals.loginSession;

      const checkLike = await this.LikesRepository.count({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id: body.thread,
          },
        },
      });

      if (checkLike > 0) {
        throw new Error("You're already like this thread!");
      }

      const newLike = this.LikesRepository.create({
        thread: body.thread,
        user: loginSession.user.id,
      });

      const createLike = await this.LikesRepository.save(newLike);
      return res.status(200).json(createLike);
    } catch (err) {
      return res.status(500).json({ error: "Cannot post like" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      const id = Number(req.params.id);

      const findLikestoDelete = await this.LikesRepository.findOne({
        where: {
          user: {
            id: loginSession.user.id,
          },
          thread: {
            id,
          },
        },
      });

      if (!findLikestoDelete) {
        return res.status(400).json({ error: "cannot find like" });
      }

      await this.LikesRepository.remove(findLikestoDelete);
      return res.status(201).json({ data: findLikestoDelete });
    } catch (err) {
      return res.status(500).json({ error: "cannot delete" });
    }
  }
})();
