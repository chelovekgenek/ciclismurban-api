import { ApiModelProperty } from "@nestjs/swagger"

import { User } from "../entities"
import { AuthResponseModel, ExposeGroup } from "../models"
import { Type, Expose } from "class-transformer"

export class AuthResponseDto extends AuthResponseModel {
  @ApiModelProperty({ type: String })
  @Expose({ groups: [ExposeGroup.READ] })
  token: string

  @ApiModelProperty({ type: User })
  @Expose({ groups: [ExposeGroup.READ] })
  @Type(() => User)
  data: User
}
