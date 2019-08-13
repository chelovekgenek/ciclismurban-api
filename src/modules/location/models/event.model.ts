import { Expose } from "class-transformer"
import { IsISO8601 } from "class-validator"

import { LocationModel, ExposeGroup } from "./location.model"

export class EventModel extends LocationModel {
  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE] })
  @IsISO8601({ always: true })
  startedAt: string
}
