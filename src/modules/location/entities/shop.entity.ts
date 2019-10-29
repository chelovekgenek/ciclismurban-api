import { Entity, Column } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"

import { ShopModel } from "../models"
import { Location } from "./location.entity"
import { WeeklySchedule } from "./misc.entity"

@Entity("shops")
export class Shop extends Location(ShopModel) {
  @Column()
  @ApiModelProperty({ type: WeeklySchedule })
  schedule: WeeklySchedule
}
