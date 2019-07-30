import { Entity } from "typeorm"

import { Location } from "./location.entity"

@Entity("services")
export class Service extends Location {}
