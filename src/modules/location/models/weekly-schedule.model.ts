import { Expose, Type } from "class-transformer"
import { IsArray, ValidateNested, IsMilitaryTime } from "class-validator"

const timePattern = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/

class DailyScheduleItemModel {
  @Expose()
  @IsMilitaryTime()
  from: string

  @Expose()
  @IsMilitaryTime()
  to: string
}

export class WeeklyScheduleModel {
  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  mon: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  tue: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  wed: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  thu: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  fri: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested()
  @IsArray()
  sat: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @IsArray()
  @ValidateNested()
  sun: DailyScheduleItemModel[]
}
