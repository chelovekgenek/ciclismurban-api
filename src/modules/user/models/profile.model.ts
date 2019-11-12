import { Expose } from "class-transformer"
import { IsOptional, IsUrl, IsString } from "class-validator"

import { ExposeGroup } from "../interfaces"

export class ProfileModel {
  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsUrl({}, { always: true })
  avatar: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsString({ always: true })
  description: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsString({ always: true })
  facebook: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsString({ always: true })
  telegram: string
}
