import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Threads } from "../entities/Threads";
import { Request, Response } from "express";
import { Reply } from "../entities/Reply";
import {
  RepliesSchemaValidate,
  UpdateRepliesSchemaValidate,
} from "../utils/validate/RepliesSchema";
import { v2 as cloudinary } from "cloudinary";

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

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
      const image = res.locals.filename;
      let imagesrc;

      const data = {
        text: body.text,
        image: image,
        thread: body.thread,
        user: res.locals.loginSession.user.id,
      };

      const { error } = RepliesSchemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error });
      }

      //connecting to cloudinary
      cloudinary.config({
        cloud_name: "dwuwsanew",
        api_key: "321989199898163",
        api_secret: "-NYynVZ1TiykXgnGCvr2GRyhGtM",
      });

      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "src/uploads/" + image,
          { folder: "circle-app" }
        );
        imagesrc = cloudinaryResponse.secure_url;
      }

      const createReply = this.RepliesRepository.create({
        text: data.text,
        image: imagesrc,
        thread: data.thread,
        user: res.locals.loginSession.user.id,
      });

      const newReply = await this.RepliesRepository.save(createReply);
      return res.status(201).json({ data: newReply });
    } catch (err) {
      return res.status(500).json({ error: `${err}` });
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
