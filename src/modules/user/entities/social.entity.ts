import { Column } from "typeorm"

import { SocialModel } from "../models"

export class Social extends SocialModel {
  @Column()
  googleId?: string

  @Column()
  facebookId?: string
}
