import { Column, Entity, ObjectIdColumn, Index, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"
import { ApiModelProperty } from "@nestjs/swagger"
import { UserModel } from "@ciclismurban/models"

import { Social } from "./social.entity"
import { Profile } from "./profile.entity"

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

  @Column()
  @ApiModelProperty({ type: String, isArray: true, readOnly: true })
  permissions: string[]

  @Column()
  social: Social

  @Column()
  @ApiModelProperty({ type: Profile, readOnly: true })
  profile: Profile

  @CreateDateColumn()
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  createdAt: Date

  @UpdateDateColumn()
  @ApiModelProperty({ type: String, format: "date-time", readOnly: true })
  updatedAt: Date
}
