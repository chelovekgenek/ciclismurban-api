import { Column } from "typeorm"
import { ApiModelProperty } from "@nestjs/swagger"
import { WeeklyScheduleModel, DailyScheduleItemModel } from "@ciclismurban/models"

export class DailySchedule extends DailyScheduleItemModel {
  @Column()
  @ApiModelProperty({ type: String, description: "military time format", example: "12:00" })
  from: string

  @Column()
  @ApiModelProperty({ type: String, description: "military time format", example: "23:59" })
  to: string
}

export class WeeklySchedule extends WeeklyScheduleModel {
  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  mon: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  tue: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  wed: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  thu: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  fri: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  sat: DailySchedule[]

  @Column()
  @ApiModelProperty({ type: DailySchedule, isArray: true })
  sun: DailySchedule[]
}
