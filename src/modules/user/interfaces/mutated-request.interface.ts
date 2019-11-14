import { Request } from "express"
import { User } from "../entities"

export interface MutatedRequest extends Request {
  user: User
}
