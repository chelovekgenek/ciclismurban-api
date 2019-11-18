import { Column } from "typeorm"
import { ProfileModel, Status } from "@ciclismurban/models"
import { ApiModelProperty } from "@nestjs/swagger"

export class Profile extends ProfileModel {
  @Column()
  @ApiModelProperty({ type: String })
  avatar: string

  @Column()
  @ApiModelProperty({ type: String, enum: Status })
  status: Status

  @Column()
  @ApiModelProperty({ type: String })
  description: string

  @Column()
  @ApiModelProperty({ type: String })
  facebook: string

  @Column()
  @ApiModelProperty({ type: String })
  telegram: string
}
