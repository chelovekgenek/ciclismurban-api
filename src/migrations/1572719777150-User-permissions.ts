import { MigrationInterface, QueryRunner } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"

import { User } from "modules/user"

export class UserPermissions1572719777150 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<any> {
    const repository = await queryRunner.databaseConnection
      .db(queryRunner.connection.driver.database)
      .collection("users")
    const records = await repository.find({ permisions: { $exists: false } })
    records.forEach(item => {
      const user: User = item as any
      repository.updateOne({ _id: user._id }, { $set: { permisions: [] } })
    })
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
