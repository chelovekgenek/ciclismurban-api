import { createParamDecorator } from "@nestjs/common"
import { getToken } from "../helpers"

export const Token = createParamDecorator((data: string, req: Request) => getToken(req))
