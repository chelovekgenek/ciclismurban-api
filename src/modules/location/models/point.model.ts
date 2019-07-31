import { IPoint } from "../interfaces"
import { Expose } from "class-transformer"
import { IsNumber } from "class-validator"

export class PointModel implements IPoint {
  @Expose()
  @IsNumber({}, { always: true })
  lat: number

  @Expose()
  @IsNumber({}, { always: true })
  lng: number
}
