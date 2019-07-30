import { ValidationError } from "class-validator"
import {
  ClassType,
  transformAndValidate,
  TransformValidationOptions,
  transformAndValidateSync,
} from "class-transformer-validator"

export interface IFlatValidationError {
  /**
   * Object's property path that haven't pass validation.
   */
  path: string

  /**
   * First constraint that failed validation with error message.
   */
  message: string
}

export function getFlatValidationErrors(errors: ValidationError[]): IFlatValidationError[] {
  const flatErrors: IFlatValidationError[] = []

  for (const error of errors) {
    toFlatArray(error, "")
  }

  return flatErrors

  function toFlatArray(error: ValidationError, parentPath: string = ""): void {
    // we format numbers as array indexes for better readability.
    const formattedProperty = Number.isInteger(+error.property)
      ? `[${error.property}]`
      : `${parentPath ? "." : ""}${error.property}`

    if (error.constraints) {
      flatErrors.push({
        path: `${parentPath}${formattedProperty}`,
        message: `${Object.values(error.constraints).pop()}`,
      })
    } else if (error.children.length > 0) {
      for (const child of error.children) {
        toFlatArray(child, `${parentPath}${formattedProperty}`)
      }
    }
  }
}

/**
 * @param {ClassType<T extends object>} classType
 * @param {object} object
 * @param {TransformValidationOptions} options
 * @return {Promise<T extends object>}
 */
export async function transformAndValidateEntity<T extends object>(
  classType: ClassType<T>,
  object: object,
  options?: TransformValidationOptions,
): Promise<T> {
  try {
    return await transformAndValidate(classType, object, options)
  } catch (errors) {
    throw getFlatValidationErrors(errors)
  }
}

export function transformAndValidateEntitySync<T extends object>(
  classType: ClassType<T>,
  object: object,
  options?: TransformValidationOptions,
): T {
  try {
    return transformAndValidateSync(classType, object, options)
  } catch (errors) {
    throw getFlatValidationErrors(errors)
  }
}
