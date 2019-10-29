import { Expose, Type } from "class-transformer"
import { IsArray, ValidateNested, IsMilitaryTime, Matches } from "class-validator"

export class DailyScheduleItemModel {
  @Expose()
  @Matches(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/, { always: true })
  from: string

  @Expose()
  @Matches(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/, { always: true })
  to: string
}

export class WeeklyScheduleModel {
  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  mon: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  tue: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  wed: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  thu: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  fri: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @ValidateNested({ always: true, each: true })
  @IsArray({ always: true })
  sat: DailyScheduleItemModel[]

  @Expose()
  @Type(() => DailyScheduleItemModel)
  @IsArray({ always: true })
  @ValidateNested({ always: true, each: true })
  sun: DailyScheduleItemModel[]
}
