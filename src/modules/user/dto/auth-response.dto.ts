import { ApiModelProperty } from "@nestjs/swagger"

import { User } from "../entities"
import { AuthResponseModel } from "../models"

export class AuthResponseDto extends AuthResponseModel {
  @ApiModelProperty({ type: String })
  token: string

  @ApiModelProperty({ type: User })
  data: User
}
