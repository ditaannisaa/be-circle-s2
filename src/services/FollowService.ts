// import { Follow } from "../entities/Follow";
// import { AppDataSource } from "../data-source";
// import { Request, Response } from "express";
// import { FollowSchemaValidate } from "../utils/validate/FollowSchema";
// import { Repository } from "typeorm";

// export default new (class FollowService {
//   private readonly FollowRepository: Repository<Follow> =
//     AppDataSource.getRepository(Follow);

//   async find(req: Request, res: Response): Promise<Response> {
//     try {
//       const findFollow = await this.FollowRepository.find({
//         relations: {
//           following_id: true,
//           follower_id: true,
//         },
//         select: {
//           following_id: {
//             id: true,
//             username: true,
//             full_name: true,
//             profile_picture: true,
//             profile_description: true,
//           },
//           follower_id: {
//             id: true,
//             username: true,
//             full_name: true,
//             profile_picture: true,
//             profile_description: true,
//           },
//         },
//       });

//       return res.status(200).json({ data: findFollow });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ error: "cannot find all the following and follower" });
//     }
//   }

//   async create(req: Request, res: Response): Promise<Response> {
//     try {
//       const body = req.body;

//       const { error } = FollowSchemaValidate.validate(body);
//       if (error) {
//         return res.status(400).json({ error: "validation follow failed" });
//       }

//       const { follower_id, following_id } = body;

//       if (follower_id === following_id) {
//         return res
//           .status(400)
//           .json({ error: "Follower and following cannot be the same user." });
//       }

//       const newCreate = this.FollowRepository.create(body);

//       await this.FollowRepository.save(newCreate);
//       return res.status(201).json({ data: newCreate });
//     } catch (err) {
//       return res
//         .status(500)
//         .json({ error: "cannot create follower and following " });
//     }
//   }

//   async delete(req: Request, res: Response): Promise<Response> {
//     try {
//       const id: number = Number(req.body);

//       const findFollower = await this.FollowRepository.findOneBy({
//         id,
//       });
//       if (!findFollower) {
//         return res.status(404).json({ error: "not found" });
//       }

//       await this.FollowRepository.remove(findFollower);

//       return res.status(200).json(findFollower);
//     } catch (err) {
//       return res.status(500).json({ error: "cannot delete" });
//     }
//   }
// })();
