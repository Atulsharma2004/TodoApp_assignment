import "dotenv/config";

export const DB_CONNECT = process.env.MONGO_URL;
export const JWT_TOKEN_KEY = process.env.JWT_KEY;
export const statusCode = {
  SUCCESS: 200,
  VALIDATION_ERROR: 201,
  UNPROCESSABLE_ENTITY: 202,
  AUTH_ERROR: 203,
};
