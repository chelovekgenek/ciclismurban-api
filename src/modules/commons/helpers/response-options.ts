import { ClassTransformOptions } from "class-transformer"

export const getResponseOptions = (groups: string[] = []): ClassTransformOptions => ({
  groups,
  excludeExtraneousValues: true,
})
