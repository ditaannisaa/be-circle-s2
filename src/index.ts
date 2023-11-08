import { AppDataSource } from "./data-source";
import * as express from "express";
import ThreadsRouter from "./route/threadRoute";
import UserRouter from "./route/userRoute";
import RepliesRouter from "./route/repliesRoute";
import LikesRouter from "./route/likesRoute";
import AuthRouter from "./route/authRoute";

import cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", ThreadsRouter);
    app.use("/api/v1", UserRouter);
    app.use("/api/v1", RepliesRouter);
    app.use("/api/v1", LikesRouter);
    app.use("/api/v1", AuthRouter);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => console.log(error));
