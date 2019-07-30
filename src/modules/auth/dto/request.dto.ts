import { ApiModelProperty } from "@nestjs/swagger"
import { Expose, Type } from "class-transformer"
import { IsEmail, IsString, Length } from "class-validator"

export class AuthRequesDto {
  @Expose({ groups: ["login", "register", "reset"] })
  @ApiModelProperty({ type: String })
  @IsEmail({}, { always: true })
  email: string

  @Expose({ groups: ["login", "register", "renew"] })
  @ApiModelProperty({ type: String })
  @IsString({ always: true })
  @Length(8, 16, { always: true })
  password: string

  @Expose({ groups: ["register"] })
  @ApiModelProperty({ type: String })
  @IsString({ groups: ["register"] })
  phone: string

  @Expose({ groups: ["renew"] })
  @ApiModelProperty({ type: String })
  @IsString({ groups: ["renew"] })
  resetToken: string

}
