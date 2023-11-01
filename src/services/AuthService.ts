import { User } from "../entities/User";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  LoginSchemaValidate,
  RegisterSchemaValidate,
} from "../utils/validate/AuthSchema";
import * as bcrypt from "bcrypt";

export default new (class AuthService {
  private readonly AuthRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = RegisterSchemaValidate.validate(data);

      const checkEmail = await this.AuthRepository.findOne({
        where: { email: value.email },
      });
      if (checkEmail) {
        return res.status(400).json({ error: "email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(value.password, 10);

      const user = this.AuthRepository.create({
        full_name: value.full_name,
        username: value.username,
        email: value.email,
        password: hashedPassword,
      });

      const createdUser = await this.AuthRepository.save(user);
      return res.status(201).json(createdUser);
    } catch (err) {
      return res.status(500).json({ Error: "Error while registering" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = LoginSchemaValidate.validate(data);

      const isCheckEmail = await this.AuthRepository.findOne({
        where: {
          email: value.email,
        },
        select: [
          "id",
          "username",
          "full_name",
          "email",
          "password",
          "profile_picture",
        ],
      });

      if (!isCheckEmail) {
        return res.status(404).json({ error: "email not found" });
      }

      const isCheckPassword = bcrypt.compare(
        value.password,
        isCheckEmail.password
      );

      if (!isCheckPassword) {
        return res.status(404).json({ error: "password not match" });
      }

      const user = this.AuthRepository.create({
        id: isCheckEmail.id,
        username: isCheckEmail.username,
        full_name: isCheckEmail.full_name,
        email: isCheckEmail.email,
        profile_picture: isCheckEmail.profile_picture,
      });

      const maxAge = 2 * 60 * 60;
      const token = await jwt.sign({ user }, "token", { expiresIn: maxAge });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      return res.status(200).json({
        status: 200,
        message: "login success",
        user,
        token,
      });
    } catch (err) {
      return res.status(500).json({ error: "Error while login" });
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;

      const user = await this.AuthRepository.findOne({
        where: {
          id: loginSession.user.id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "You are logged in",
        user,
      });
    } catch (err) {
      return res.status(500).json({ error: "error while checking" });
    }
  }
})();
