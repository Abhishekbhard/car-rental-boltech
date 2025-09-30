import { ResponseUtil } from "../../../../src/infrastructure/api/utils/response";

describe("ResponseUtil", () => {
  describe("success", () => {
    it("should return a success response with data and message", () => {
      const data = { id: 1, name: "Test" };
      const message = "Success message";
      const result = ResponseUtil.success(data, message);

      expect(result).toEqual({
        success: true,
        data,
        message,
      });
    });

    it("should return a success response without message", () => {
      const data = { id: 1 };
      const result = ResponseUtil.success(data);

      expect(result).toEqual({
        success: true,
        data,
      });
    });
  });

  describe("error", () => {
    it("should return an error response with code, message, and details", () => {
      const code = "VALIDATION_ERROR";
      const message = "Invalid input";
      const details = "Field is required";
      const result = ResponseUtil.error(code, message, details);

      expect(result).toEqual({
        success: false,
        error: {
          code,
          message,
          details,
        },
      });
    });

    it("should return an error response without details", () => {
      const code = "NOT_FOUND";
      const message = "Resource not found";
      const result = ResponseUtil.error(code, message);

      expect(result).toEqual({
        success: false,
        error: {
          code,
          message,
        },
      });
    });
  });

  describe("sendSuccess", () => {
    it("should send a success response with default status 200", () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const data = { id: 1 };
      const message = "Success";

      ResponseUtil.sendSuccess(mockRes, data, message);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data,
        message,
      });
    });

    it("should send a success response with custom status", () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const data = { id: 1 };

      ResponseUtil.sendSuccess(mockRes, data, undefined, 201);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data,
      });
    });
  });

  describe("sendError", () => {
    it("should send an error response with default status 500", () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const code = "INTERNAL_ERROR";
      const message = "Something went wrong";

      ResponseUtil.sendError(mockRes, code, message);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code,
          message,
        },
      });
    });

    it("should send an error response with custom status and details", () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const code = "VALIDATION_ERROR";
      const message = "Invalid input";
      const details = "Field required";

      ResponseUtil.sendError(mockRes, code, message, 400, details);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code,
          message,
          details,
        },
      });
    });
  });
});
