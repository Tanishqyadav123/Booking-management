import { decodedUserType } from "./auth.types";

declare global {
  namespace Express {
    interface Request {
      user?: decodedUserType;
    }
  }
}
