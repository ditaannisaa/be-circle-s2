import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default new (class AuthenticationnMiddleware {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const Authorization = req.headers.authorization;

      if (!Authorization || !Authorization.startsWith("Bearer")) {
        return res.status(401).json({
          status: 401,
          message: "Unauthorized",
        });
      }

      const token = Authorization.split(" ")[1];

      try {
        const loginSession = jwt.verify(token, "token");
        res.locals.loginSession = loginSession;
        next();
      } catch (err) {
        return res.status(500).json({ error: "Unauthorized" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Error while authenticating" });
    }
  }
})();
