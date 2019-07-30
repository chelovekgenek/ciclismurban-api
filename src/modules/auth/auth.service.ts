import { JwtService } from "@nestjs/jwt"
import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common"
import { plainToClass } from "class-transformer"
import bcrypt from "bcrypt"

import { UserService } from "modules/user"
import { Bitrix24Service, Bitrix24ValueTypes } from "modules/bitrix24"
import { UserModel } from "modules/user/models"

import { JwtPayload } from "./interfaces/jwt.interface"
import { AuthRequesDto } from "./dto"
import { AuthResponseDto } from "./dto/response.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bitrix24Service: Bitrix24Service,
  ) {}

  async login(data: AuthRequesDto): Promise<AuthResponseDto> {
    try {
      const user = await this.userService.findOneByEmail(data.email)
      const match = await bcrypt.compare(data.password, user.password)
      if (!match) {
        throw new Error("Password not match")
      }

      return this.prepareResponse(user)
    } catch (e) {
      throw new UnauthorizedException(e.message, e)
    }
  }

  async loginByToken(token: string): Promise<AuthResponseDto> {
    const payload: JwtPayload = this.verify(token)

    const user = await this.userService.findOneById(payload.uuid)
    return this.prepareResponse(user)
  }

  async register({ email, password, phone }: AuthRequesDto): Promise<AuthResponseDto> {
    try {
      const contactId = await this.bitrix24Service.addContact({
        PHONE: [{ VALUE: phone, VALUE_TYPE: Bitrix24ValueTypes.WORK }],
        EMAIL: email,
      })
      const user = await this.userService.create({ email, password, contactId })
      return this.prepareResponse(user)
    } catch (e) {
      throw new ConflictException(e.message)
    }
  }

  async prepareResponse(user: UserModel): Promise<AuthResponseDto> {
    return plainToClass(
      AuthResponseDto,
      {
        token: this.jwtService.sign({ uuid: user.uuid }),
        uuid: user.uuid,
      },
      { groups: ["read"], excludeExtraneousValues: true },
    )
  }

  verify(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token)
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }
  }

  async validate({ uuid }: JwtPayload): Promise<any> {
    return this.userService.findOneById(uuid)
  }


  async renew({email}): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    let resetToken = "";
    const mod = 1000000;
    do {
      resetToken = (mod + Math.ceil(+(new Date()) * Math.random()) % mod).toString();
      resetToken = resetToken.slice(-mod.toString().length + 1);
    } while (this.userService.findOneByResetToken(resetToken));


    await this.userService.sendEmail(user, "resetToken", {resetToken});
    await this.userService.setResetTokenForUser(user, resetToken);

    return user;
  }


  async reset({resetToken, password}): Promise<any> {
    const user = await this.userService.findOneByResetToken(resetToken);

    await this.userService.setPassword(user, password);

    return user;
  }
}
