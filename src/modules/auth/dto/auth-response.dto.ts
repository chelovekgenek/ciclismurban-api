import { ApiModelProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

import { AuthResponseModel } from "../models"
import { ExposeGroup } from "../interfaces"

export class AuthResponseDto extends AuthResponseModel {
  @ApiModelProperty({ type: String })
  @Expose({ groups: [ExposeGroup.READ] })
  token: string
}
