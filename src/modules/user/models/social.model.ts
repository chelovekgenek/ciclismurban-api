import { Expose } from "class-transformer"
import { IsString, IsOptional } from "class-validator"

export class SocialModel {
  @Expose()
  @IsString()
  @IsOptional()
  googleId?: string

  @Expose()
  @IsString()
  @IsOptional()
  facebookId?: string
}
