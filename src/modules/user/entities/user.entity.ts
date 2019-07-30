import { Column, Entity, ObjectIdColumn, Index, ObjectID, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer"
import { UserModel } from "../models/user.model"

@Entity({ name: "users" })
export class User extends UserModel {
  @Exclude()
  @ObjectIdColumn()
  /* tslint:disable */
  _id: ObjectID
  /* tslint:enable */

  @Column()
  @Index("uuid", { unique: true })
  uuid: string

  @Column()
  @Index("email", { unique: true })
  email: string

  @Column()
  password: string

  @Column()
  contactId: string

  @Column()
  orderId: string

  @Column()
  dealId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
