import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Threads } from "../entities/Threads";
import { Request, Response } from "express";
import {
  ThreadsSchemaValidate,
  UpdateThreadsSchemaValidate,
} from "../utils/validate/ThreadsSchema";
import { v2 as cloudinary } from "cloudinary";

export default new (class ThreadService {
  private readonly ThreadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const findThreads = await this.ThreadRepository.find({
        relations: {
          user: true,
          reply: true,
          like: true,
        },
        order: { id: "DESC" },
      });

      return res.status(200).json({ data: findThreads });
    } catch (err) {
      return res.status(500).json({ error: "Threads error" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const thread = await this.ThreadRepository.findOne({
        where: { id: id },
        relations: {
          user: true,
          reply: true,
          like: true,
        },
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ error: "Cannot find thread" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = res.locals.loginSession;

      const image = res.locals.filename;
      let imagesrc;
      const data = {
        content: req.body.content,
        image: image,
      };

      const { error } = ThreadsSchemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error });
      }

      //connecting to cloudinary
      cloudinary.config({
        cloud_name: "dwuwsanew",
        api_key: "321989199898163",
        api_secret: "-NYynVZ1TiykXgnGCvr2GRyhGtM",
      });

      // upload

      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
          "src/uploads/" + image,
          { folder: "circle-app" }
        );
        imagesrc = cloudinaryResponse.secure_url;
      }

      const newThreads = this.ThreadRepository.create({
        content: data.content,
        image: imagesrc,
        user: user.user.id,
      });

      const createdThread = await this.ThreadRepository.save(newThreads);

      return res.status(201).json(createdThread);
    } catch (err) {
      return res.status(500).json({ error: "Threads error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;
      const findThread = await this.ThreadRepository.findOneBy({ id });

      if (!findThread) {
        return res.status(404).json({ error: "Thread not found" });
      }

      const { error } = UpdateThreadsSchemaValidate.validate(data);
      if (error) {
        return res.status(400).json({ error });
      }

      findThread.content = data.content;
      findThread.image = data.image;

      await this.ThreadRepository.save(findThread);
      return res.status(200).json({ data: findThread });
    } catch (err) {
      return res.status(500).json({ error: "Update error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const findThreadtoDelete = await this.ThreadRepository.findOneBy({ id });

      if (!findThreadtoDelete) {
        return res.status(404).json({ error: "Thread not found" });
      }
      this.ThreadRepository.remove(findThreadtoDelete);

      return res.status(200).json({ data: findThreadtoDelete });
    } catch (err) {
      return res.status(500).json({ error: "Delete error" });
    }
  }
})();
