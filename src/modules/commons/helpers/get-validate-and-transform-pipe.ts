import { ValidateAndTransformPipe } from "../pipes"

export const getValidateAndTransformPipe = (groups: string[] = [], customTransformClass?: any) => {
  const options: any = {
    validator: {
      groups,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
    },
    transformer: {
      groups,
    },
  }
  if (customTransformClass) {
    options.customTransformClass = customTransformClass
  }
  return new ValidateAndTransformPipe(options)
}
