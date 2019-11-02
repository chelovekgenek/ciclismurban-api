import { Social } from "modules/user"

export type SocialPayload = { [key in keyof Social]?: string }
