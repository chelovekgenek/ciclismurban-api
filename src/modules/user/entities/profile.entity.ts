import { Column } from "typeorm"
import { ProfileModel } from "@ciclismurban/models"
import { ApiModelProperty } from "@nestjs/swagger"

export class Profile extends ProfileModel {
  @Column()
  @ApiModelProperty({ type: String, readOnly: true })
  avatar: string

  @Column()
  @ApiModelProperty({ type: String, readOnly: true })
  description: string

  @Column()
  @ApiModelProperty({ type: String, readOnly: true })
  facebook: string

  @Column()
  @ApiModelProperty({ type: String, readOnly: true })
  telegram: string
}
