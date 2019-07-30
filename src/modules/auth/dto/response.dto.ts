import { Expose } from "class-transformer"
import { ApiModelProperty } from "@nestjs/swagger"
import { UserModel } from "modules/user/models"

export class AuthResponseDto {
  @Expose({ groups: ["read"] })
  @ApiModelProperty({ type: String })
  token: string

  @Expose({ groups: ["read"] })
  @ApiModelProperty({ type: String })
  uuid: UserModel
}
