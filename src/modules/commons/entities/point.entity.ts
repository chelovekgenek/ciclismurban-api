import { Column } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"

import { PointModel } from "@ciclismurban/models"

export class Point extends PointModel {
  @Column()
  @ApiModelProperty({ type: Number })
  lat: number

  @Column()
  @ApiModelProperty({ type: Number })
  lng: number
}
