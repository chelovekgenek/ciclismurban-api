import { Request } from "express"

import { User } from "modules/user"

export interface AuthenticatedRequest extends Request {
  user: User
}
