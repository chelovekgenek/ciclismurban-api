import { Entity } from "typeorm"

import { Location } from "./location.entity"

@Entity("shops")
export class Shop extends Location {}
