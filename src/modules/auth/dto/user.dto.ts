import { Type, Expose } from "class-transformer"
import { Bitrix24ContactDto } from "modules/bitrix24"
import { ApiModelProperty } from "@nestjs/swagger"

export class AuthUserDto {
  @Expose()
  @ApiModelProperty({ type: String })
  email: string

  @Expose()
  @Type(() => Bitrix24ContactDto)
  @ApiModelProperty({ type: Bitrix24ContactDto })
  contact: Bitrix24ContactDto
}
