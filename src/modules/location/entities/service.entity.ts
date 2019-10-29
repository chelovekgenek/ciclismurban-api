import { Entity, Column } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"

import { ServiceModel } from "../models"
import { Location } from "./location.entity"
import { WeeklySchedule } from "./misc.entity"

@Entity("services")
export class Service extends Location(ServiceModel) {
  @Column()
  @ApiModelProperty({ type: WeeklySchedule })
  schedule: WeeklySchedule
}
