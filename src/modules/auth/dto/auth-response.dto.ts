import { ApiModelProperty } from "@nestjs/swagger"
import { Type, Expose } from "class-transformer"

import { User, ExposeGroup } from "modules/user"

import { AuthResponseModel } from "../models"

export class AuthResponseDto extends AuthResponseModel {
  @ApiModelProperty({ type: String })
  @Expose({ groups: [ExposeGroup.READ] })
  token: string

  @ApiModelProperty({ type: User })
  @Expose({ groups: [ExposeGroup.READ] })
  @Type(() => User)
  data: User
}
