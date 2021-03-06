import { MigrationInterface } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

import { Shop } from "modules/location/entities"

export class LocationShopSchedule1572518754819 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<any> {
    const repository = await queryRunner.databaseConnection
      .db(queryRunner.connection.driver.database)
      .collection("shops")
    const records = await repository.find({ schedule: { $exists: false } })
    records.forEach(item => {
      const service: Shop = item as any
      repository.updateOne(
        { _id: service._id },
        { $set: { schedule: { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] } } },
      )
    })
  }

  public async down(queryRunner: MongoQueryRunner): Promise<any> {}
}
