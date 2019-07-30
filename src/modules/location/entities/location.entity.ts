import { Column, ObjectIdColumn, Index, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"

import { LocationModel, PointModel } from "../models"
import { Exclude } from "class-transformer"

export class Point extends PointModel {
  @Column()
  @ApiModelProperty({ type: Number })
  lat: number

  @Column()
  @ApiModelProperty({ type: Number })
  lng: number
}

export class Location extends LocationModel {
  @Exclude()
  @ObjectIdColumn()
  /* tslint:disable */
  _id: ObjectID
  /* tslint:enable */

  @Column()
  @Index("uuid", { unique: true })
  @ApiModelProperty({
    type: String,
    readOnly: true,
    format: "uuid",
    description: "uuid v4",
    example: "e12acc6f-2f34-442c-92d3-d4199fb12345",
  })
  uuid: string

  @Column()
  @ApiModelProperty({ type: String })
  title: string

  @Column()
  @ApiModelProperty({ type: String })
  description: string

  @Column()
  @ApiModelProperty({ type: String })
  image: string

  @Column()
  @ApiModelProperty({ type: Point })
  point: Point

  @CreateDateColumn()
  @ApiModelProperty({ type: String })
  createdAt: Date

  @UpdateDateColumn()
  @ApiModelProperty({ type: String })
  updatedAt: Date
}
