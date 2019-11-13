import { ApiModelProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

import { ExposeGroup } from "../interfaces"

export class AuthResponseDto {
  @ApiModelProperty({ type: String })
  @Expose({ groups: [ExposeGroup.READ] })
  token: string
}
