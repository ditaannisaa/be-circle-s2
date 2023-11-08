import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { UserSchemaValidate } from "../utils/validate/UserSchema";

export default new (class UserService {
  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.UserRepository.find({
        relations: ["threads", "reply", "followers", "following", "like"],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "cannot find users" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error } = UserSchemaValidate.validate(data);
      if (error) {
        return res.status(401).json({ error });
      }

      const existingUser = await this.UserRepository.findOne({
        where: { email: data.email },
      });
      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const newUser = this.UserRepository.create(data);

      await this.UserRepository.save(newUser);
      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({ error: "Threads error" });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const user = await this.UserRepository.findOne({
        where: { id },
        relations: ["threads", "reply", "followers", "following", "like"],
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: "error find user" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;
      const findUser = await this.UserRepository.findOneBy({ id });

      if (!findUser) {
        return res.status(404).json({ error: "user not found" });
      }

      findUser.username = data.username;
      findUser.full_name = data.full_name;
      findUser.email = data.email;
      findUser.password = data.password;
      findUser.profile_picture = data.profile_picture;
      findUser.profile_description = data.profile_description;

      await this.UserRepository.save(findUser);
      return res.status(200).json({ data: findUser });
    } catch (err) {
      return res.status(500).json({ error: "error update" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const findUser = await this.UserRepository.findOneBy({ id });

      if (!findUser) {
        return res.status(404).json({ error: "user not found" });
      }

      await this.UserRepository.remove(findUser);

      return res.status(200).json(findUser);
    } catch (err) {
      return res.status(500).json({ error: "delete user error" });
    }
  }
  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      const followingId = Number(req.body.followingId);

      const follower = await this.UserRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
        relations: ["following"],
      });

      const following = await this.UserRepository.findOne({
        where: {
          id: followingId,
        },
      });

      if (!follower || !following) {
        return res.status(404).json({ error: "User not found" });
      }
      if (loginSession.user.id == followingId) {
        return res.status(404).json({ error: "Cannot follow yourself " });
      }

      const isFollowing = follower.following.some(
        (user) => user.id === following.id
      );

      if (isFollowing) {
        //if already followed, unfollow
        follower.following = follower.following.filter(
          (user) => user.id !== following.id
        );
      } else {
        //doesn't follow yet
        follower.following.push(following);
      }

      await this.UserRepository.save(follower);
      return res.status(200).json(follower);
    } catch (err) {
      return res.status(500).json({ error: "cannot follow" });
    }
  }
})();
