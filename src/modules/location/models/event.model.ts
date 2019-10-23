import { Expose } from "class-transformer"
import { IsISO8601, IsOptional } from "class-validator"

import { LocationModel, ExposeGroup } from "./location.model"

export class EventModel extends LocationModel {
  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.UPDATE] })
  @IsOptional({ groups: [ExposeGroup.UPDATE] })
  @IsISO8601({ always: true })
  startedAt: string
}
