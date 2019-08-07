import { get } from "lodash"

export const getToken = (req: Request) => get(req, "headers.authorization")
