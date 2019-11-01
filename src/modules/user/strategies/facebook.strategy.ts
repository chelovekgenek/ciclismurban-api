import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-http-bearer"
import FB from "fb"

import { AuthService } from "../services"
import { AuthResponseDto } from "../dto"
import { User } from "../entities"

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
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

  async verifyToken(token: string): Promise<{ id: string; email: string }> {
    return new Promise((resolve, reject) => {
      FB.api("me", { fields: ["id", "email"], access_token: token }, res => {
        if (res.error) {
          reject(null)
        } else {
          resolve(res)
        }
      })
    })
  }
}
