import { PipeTransform, Injectable } from "@nestjs/common"
import { Parking } from "../entities"
import { ParkingRepository } from "../repositories"

interface IReqParams {
  id: string
}

@Injectable()
export class ParkingByIdPipe implements PipeTransform<IReqParams, Promise<Parking>> {
  constructor(protected readonly parkingRepository: ParkingRepository) {}

  async transform({ id }: IReqParams) {
    return this.parkingRepository.findOneOrFail({ uuid: id })
  }
}
