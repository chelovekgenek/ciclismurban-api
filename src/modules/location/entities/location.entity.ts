import { Column, ObjectIdColumn, Index, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"

import { Constructor } from "modules/commons"
import { Point } from "./misc.entity"

export function Location<T extends Constructor<{}>>(SuperClass: T) {
  class LocalClass extends SuperClass {
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
  return LocalClass
}
