import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-http-bearer"
import { OAuth2Client } from "google-auth-library"
import { LoginTicket, TokenPayload } from "google-auth-library/build/src/auth/loginticket"

import { AuthService } from "../services"
import { GOOGLE_OPTIONS } from "../constants"
import { AuthResponseDto } from "../dto"
import { User } from "../entities"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  private readonly clientGoogle = new OAuth2Client(GOOGLE_OPTIONS.clientID)

  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(token: string): Promise<AuthResponseDto> {
    const payload = await this.verifyToken(token)
    let user: User
    if (payload) {
      user = await this.authService.validateOrCreateSocialUser(payload.email)
    }
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.authService.pack(user)
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      const ticket: LoginTicket = await this.clientGoogle.verifyIdToken({
        idToken: token,
        audience: GOOGLE_OPTIONS.clientID,
      })
      return ticket.getPayload()
    } catch (e) {
      return null
    }
  }
}
