import { Expose, Type } from "class-transformer"

import { ExposeGroup, UserModel } from "./user.model"

export class AuthResponseModel {
  @Expose({ groups: [ExposeGroup.READ] })
  token: string

  @Expose({ groups: [ExposeGroup.READ] })
  @Type(() => UserModel)
  data: UserModel
}
