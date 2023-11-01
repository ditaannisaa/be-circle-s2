import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Threads } from "../entities/Threads";
import { Request, Response } from "express";
import { Reply } from "../entities/Reply";
import {
  RepliesSchemaValidate,
  UpdateRepliesSchemaValidate,
} from "../utils/validate/RepliesSchema";

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const replies = await this.RepliesRepository.find({
        relations: {
          user: true,
          thread: true,
        },
      });

      return res.status(201).json(replies);
    } catch (err) {
      return res.status(500).json({ error: "Replies error" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;

      const { error } = RepliesSchemaValidate.validate(body);
      if (error) {
        return res.status(400).json({ error });
      }

      const newReply = this.RepliesRepository.create(body);

      await this.RepliesRepository.save(newReply);
      return res.status(201).json({ data: newReply });
    } catch (err) {
      return res.status(500).json({ error: "Create reply error" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const reply = await this.RepliesRepository.findOne({
        where: { id },
        relations: {
          user: true,
          thread: true,
        },
      });

      return res.status(201).json(reply);
    } catch (err) {
      return res.status(500).json({ error: "Find reply error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const body = req.body;

      const findReply = await this.RepliesRepository.findOneBy({ id });
      if (!findReply) {
        return res.status(404).json({ error: "reply not found" });
      }

      const { error } = UpdateRepliesSchemaValidate.validate(body);
      if (error) {
        return res.status(400).json({ error });
      }

      findReply.text = body.text;
      findReply.image = body.image;

      await this.RepliesRepository.save(findReply);
      return res.status(200).json({ data: findReply });
    } catch (err) {
      return res.status(500).json({ error: "Update error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const findReplytoDelete = await this.RepliesRepository.findOne({
        where: { id },
      });

      if (!findReplytoDelete) {
        return res.status(400).json({ error: "Find reply error" });
      }

      await this.RepliesRepository.delete(id);
      return res.status(200).json(id);
    } catch (err) {
      return res.status(500).json({ error: "Delete error" });
    }
  }
})();
