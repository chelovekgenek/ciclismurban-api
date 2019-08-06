import { Entity } from "typeorm"

import { ServiceModel } from "../models"

import { Location } from "./location.entity"

@Entity("services")
export class Service extends Location(ServiceModel) {}
