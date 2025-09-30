import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../utils/response";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    ResponseUtil.sendError(res, err.errorCode, err.message, err.statusCode);
  } else {
    console.error("Unexpected error:", err);
    ResponseUtil.sendError(
      res,
      "INTERNAL_ERROR",
      "An unexpected error occurred",
      500,
      process.env.NODE_ENV === "development" ? err.message : undefined
    );
  }
};
