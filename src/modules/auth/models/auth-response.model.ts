import { Expose } from "class-transformer"

import { ExposeGroup } from "../interfaces"

export class AuthResponseModel {
  @Expose({ groups: [ExposeGroup.READ] })
  token: string
}
