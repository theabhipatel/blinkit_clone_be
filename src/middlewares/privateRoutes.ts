import { RequestHandler } from "express";

export const privateRoutes: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    if (!userId)
      return res.status(401).json({
        success: false,
        message: "Please login first then try again.",
      });
    next();
  } catch (error) {
    next(error);
  }
};
