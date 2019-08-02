import { Expose } from "class-transformer"
import { IsEmail, IsString, Length } from "class-validator"

export enum ExposeGroup {
  READ = "read",
  WRITE = "write",
  LOGIN = "login",
}

export class UserModel {
  @Expose({ groups: [ExposeGroup.READ] })
  uuid: string

  @Expose({ groups: [ExposeGroup.READ, ExposeGroup.WRITE, ExposeGroup.LOGIN] })
  @IsEmail({}, { always: true })
  email: string

  @Expose({ groups: [ExposeGroup.WRITE, ExposeGroup.LOGIN] })
  @IsString({ always: true })
  @Length(8, 16, { always: true })
  password: string

  @Expose({ groups: [ExposeGroup.READ] })
  createdAt: Date

  @Expose({ groups: [ExposeGroup.READ] })
  updatedAt: Date
}
