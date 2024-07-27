import { Request, Response, NextFunction } from "express";
import { ApiError } from "./../entities/apiError";

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON());
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
