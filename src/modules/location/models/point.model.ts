import { IPoint } from "../interfaces"
import { Expose } from "class-transformer"

export class PointModel implements IPoint {
  @Expose()
  lat: number

  @Expose()
  lng: number
}
