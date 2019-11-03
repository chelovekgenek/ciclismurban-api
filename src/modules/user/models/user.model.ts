import { Expose, Exclude, Type } from "class-transformer"
import { IsEmail, IsString, Length, IsIn } from "class-validator"

import { Permissions, ExposeGroup } from "../interfaces"
import { SocialModel } from "./social.model"

export class UserModel {
  @Expose({ groups: [ExposeGroup.READ] })
  uuid: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.LOGIN] })
  @IsEmail({}, { always: true })
  email: string

  @Expose({ groups: [ExposeGroup.WRITE, ExposeGroup.LOGIN] })
  @IsString({ always: true })
  @Length(8, 16, { always: true })
  password?: string

  @Expose({ groups: [ExposeGroup.READ] })
  @IsIn(Permissions, { always: true })
  permissions: string[]

  @Exclude()
  @Type(() => SocialModel)
  social?: SocialModel

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
