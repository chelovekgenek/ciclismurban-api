import { PipeTransform, Injectable } from "@nestjs/common"

import { Shop } from "../entities"
import { ShopRepository } from "../repositories"

interface IReqParams {
  id: string
}

@Injectable()
export class ShopByIdPipe implements PipeTransform<IReqParams, Promise<Shop>> {
  constructor(protected readonly shopRepository: ShopRepository) {}

  async transform({ id }: IReqParams) {
    return this.shopRepository.findOneOrFail({ uuid: id })
  }
}
