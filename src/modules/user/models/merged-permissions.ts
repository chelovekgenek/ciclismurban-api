import { EventPermissions, ParkingPermissions, ServicePermissions, ShopPermissions } from "modules/location"

const mergeValues = (enums: Array<{ [key: string]: string }>): string[] =>
  enums.reduce((prevValue: string[], currentValue: object) => prevValue.concat(Object.values(currentValue)), [])

export const MergedPermissions = mergeValues([
  EventPermissions,
  ParkingPermissions,
  ServicePermissions,
  ShopPermissions,
])
