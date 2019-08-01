import { Expose, Type } from "class-transformer"
import { User } from "../entities"

import { ExposeGroup } from "../models"
import { ApiModelProperty } from "@nestjs/swagger"

export class AuthResponseDto {
  @Expose({ groups: [ExposeGroup.READ] })
  @ApiModelProperty({ type: String })
  token: string

  @Expose({ groups: [ExposeGroup.READ] })
  @Type(() => User)
  @ApiModelProperty({ type: User })
  data: User
}
