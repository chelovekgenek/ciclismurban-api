import { Expose, Type } from "class-transformer"
import { ValidateNested } from "class-validator"

import { ILocation, IPoint } from "../interfaces"
import { PointModel } from "./point.model"

export enum ExposeGroup {
  READ = "read",
  WRITE = "write",
}

export class LocationModel implements ILocation {
  @Expose({ groups: [ExposeGroup.READ] })
  uuid: string

  @Expose({ groups: [ExposeGroup.READ] })
  title: string

  @Expose({ groups: [ExposeGroup.READ] })
  description: string

  @Expose({ groups: [ExposeGroup.READ] })
  image: string

  @Expose({ groups: [ExposeGroup.READ] })
  @Type(() => PointModel)
  @ValidateNested()
  point: IPoint

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
