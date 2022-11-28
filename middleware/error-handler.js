import { CustomAPIError } from "../errors/custom-error.js";
const errorHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error });
  }
  return res.status(500).json({ msg: error });
};

export default errorHandlerMiddleware;
