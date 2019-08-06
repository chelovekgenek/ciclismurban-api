import { Expose, Type } from "class-transformer"
import { ValidateNested, IsString, IsUrl } from "class-validator"

import { PointModel } from "./point.model"

export enum ExposeGroup {
  READ = "read",
  WRITE = "write",
}

export class LocationModel {
  @Expose({ groups: [ExposeGroup.READ] })
  uuid: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE] })
  @IsString({ always: true })
  title: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE] })
  @IsString({ always: true })
  description: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE] })
  @IsUrl({}, { always: true })
  image: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE] })
  @Type(() => PointModel)
  @ValidateNested({ always: true })
  point: PointModel

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
