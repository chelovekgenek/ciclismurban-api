import { Entity } from "typeorm"
import { ParkingModel } from "@ciclismurban/models"

import { Location } from "./location.entity"

@Entity("parkings")
export class Parking extends Location(ParkingModel) {}
