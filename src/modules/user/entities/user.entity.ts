import { Column, Entity, ObjectIdColumn, Index, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"
import { UserModel } from "../models/user.model"
import { ApiModelProperty } from "@nestjs/swagger"

@Entity({ name: "users" })
export class User extends UserModel {
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
  @Index("email", { unique: true })
  @ApiModelProperty({ type: String })
  email: string

  @Column()
  @ApiModelProperty({ type: String })
  password?: string

  @CreateDateColumn()
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  createdAt: Date

  @UpdateDateColumn()
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  updatedAt: Date
}
