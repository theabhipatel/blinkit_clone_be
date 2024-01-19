import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const deserializeUser: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]?.split(" ");
    if (authHeader) {
      const [Bearer, token] = authHeader;
      if (Bearer === "Bearer") {
        const userInfo = jwt.verify(token, JWT_SECRET!) as { userId: string };
        if (userInfo) {
          res.locals.userId = userInfo.userId;
        }
      }
    }
    next();
  } catch (error) {
    console.log("JWT Error : ", error);
    next();
  }
};
