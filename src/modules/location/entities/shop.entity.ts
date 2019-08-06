import { Entity } from "typeorm"

import { ShopModel } from "../models"

import { Location } from "./location.entity"

@Entity("shops")
export class Shop extends Location(ShopModel) {}
