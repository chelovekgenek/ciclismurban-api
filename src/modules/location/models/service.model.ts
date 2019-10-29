import { Expose, Type } from "class-transformer"
import { IsOptional, ValidateNested } from "class-validator"

import { LocationModel, ExposeGroup } from "./location.model"
import { WeeklyScheduleModel } from "./weekly-schedule.model"

export class ServiceModel extends LocationModel {
  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @Type(() => WeeklyScheduleModel)
  @ValidateNested({ always: true })
  schedule: WeeklyScheduleModel
}
