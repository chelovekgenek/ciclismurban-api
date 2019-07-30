import { Entity } from "typeorm"

import { Location } from "./location.entity"

@Entity("parkings")
export class Parking extends Location {}
