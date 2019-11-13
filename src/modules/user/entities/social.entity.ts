import { Column } from "typeorm"
import { SocialModel } from "@ciclismurban/models"

export class Social extends SocialModel {
  @Column()
  googleId?: string

  @Column()
  facebookId?: string
}
