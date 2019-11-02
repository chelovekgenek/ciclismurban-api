import { IAuthModuleOptions } from "@nestjs/passport"
import { JwtModuleOptions } from "@nestjs/jwt"
import { IOAuth2StrategyOption } from "passport-google-oauth"

import { Config } from "modules/commons"

export const PASSPORT_OPTIONS: IAuthModuleOptions = {
  defaultStrategy: "jwt",
}

export const JWT_OPTIONS: JwtModuleOptions = {
  secret: Config.get("JWT_SECRET"),
  signOptions: {
    expiresIn: "12h",
  },
}

export const GOOGLE_OPTIONS: IOAuth2StrategyOption = {
  clientID: Config.get("GOOGLE_OUATH_CLIENT_ID"),
  clientSecret: Config.get("GOOGLE_OUATH_CLIENT_SECRET"),
  callbackURL: undefined,
}
