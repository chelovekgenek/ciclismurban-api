import { get } from "lodash"

export const getToken = (req: Request, key: string = "authorization") => get(req.headers, key)
