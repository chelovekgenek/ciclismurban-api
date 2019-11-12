import { IsEmail, IsString, Length, IsArray, IsIn } from "class-validator"
import { Expose, Exclude, Type } from "class-transformer"

import { SocialModel } from "./social.model"
import { MergedPermissions } from "./merged-permissions"
import { ExposeGroup } from "../interfaces"
import { ProfileModel } from "./profile.model"

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
  @IsArray({ groups: [ExposeGroup.UPDATE] })
  @IsIn(MergedPermissions, { groups: [ExposeGroup.UPDATE], each: true })
  permissions: string[]

  @Exclude()
  @Type(() => SocialModel)
  social?: SocialModel

  @Exclude()
  @Type(() => ProfileModel)
  profile: ProfileModel

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
