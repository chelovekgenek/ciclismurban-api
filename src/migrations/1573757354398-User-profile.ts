import { MigrationInterface, QueryRunner } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner"
import { User } from "modules/user"

export class UserProfile1573757354398 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<any> {
    const repository = await queryRunner.databaseConnection
      .db(queryRunner.connection.driver.database)
      .collection("users")
    const records = await repository.find({ permissions: { $exists: false } })
    records.forEach(item => {
      const user: User = item as any
      repository.updateOne({ _id: user._id }, { $set: { profile: {} } })
    })
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
