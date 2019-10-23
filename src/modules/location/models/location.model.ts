import { Expose, Type } from "class-transformer"
import { ValidateNested, IsString, IsUrl, Length, IsOptional } from "class-validator"

import { PointModel } from "./point.model"

export enum ExposeGroup {
  READ = "read",
  WRITE = "write",
  UPDATE = "update",
}

export class LocationModel {
  @Expose({ groups: [ExposeGroup.READ] })
  uuid: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsString({ always: true })
  @Length(3, undefined, { always: true })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  title: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsString({ always: true })
  description: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsUrl({}, { always: true })
  image: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @Type(() => PointModel)
  @ValidateNested({ always: true })
  point: PointModel

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
