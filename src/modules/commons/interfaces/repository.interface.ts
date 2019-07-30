import { Connection } from "typeorm"

export interface IRepositoryProvider {
  provide: string
  useFactory: (connection: Connection) => any
  inject?: Array<typeof Connection>
}

export type RepositoryProvider = Readonly<IRepositoryProvider>
