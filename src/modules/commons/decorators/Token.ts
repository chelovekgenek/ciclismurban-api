import { createParamDecorator } from "@nestjs/common"
import { get } from "lodash"

export const Token = createParamDecorator((data: string, req: Request) => get(req, "headers.authorization"))
