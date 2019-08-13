import { ApiModelProperty } from "@nestjs/swagger"
import { Entity, Column } from "typeorm"

import { EventModel } from "../models"

import { Location } from "./location.entity"

@Entity("events")
export class Event extends Location(EventModel) {
  @Column()
  @ApiModelProperty({ type: String })
  startedAt: string
}
