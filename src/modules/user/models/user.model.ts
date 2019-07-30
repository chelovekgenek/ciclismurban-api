import { Expose, Type } from "class-transformer"
import { ApiModelProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class UserModel {
  @Expose({ groups: ["read"] })
  @ApiModelProperty({
    type: String,
    readOnly: true,
    format: "uuid",
    description: "uuid v4",
    example: "e12acc6f-2f34-442c-92d3-d4199fb12345",
  })
  uuid?: string

  @Expose({ groups: ["read", "write"] })
  @ApiModelProperty({ type: String })
  @IsEmail({}, { groups: ["read", "write"] })
  email: string

  @Expose({ groups: ["write"] })
  @ApiModelProperty({ type: String })
  @IsString({ groups: ["write"] })
  @Length(8, 16, { groups: ["write"] })
  password: string

  @Expose({ groups: ["read"] })
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  createdAt?: Date

  @Expose({ groups: ["read"] })
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  updatedAt?: Date
}
