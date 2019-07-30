import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from "@nestjs/common"
import { isNil } from "@nestjs/common/utils/shared.utils"
import { loadPackage } from "@nestjs/common/utils/load-package.util"
import { ClassTransformOptions, plainToClass } from "class-transformer"
import { validate, ValidatorOptions } from "class-validator"

import { getFlatValidationErrors } from "../helpers"

export interface ValidateAndTransformPipeOptions {
  validator?: ValidatorOptions
  transformer?: ClassTransformOptions
  customTransformClass?: new (...args) => any | undefined
}

@Injectable()
export class ValidateAndTransformPipe implements PipeTransform<any> {
  protected readonly classValidator: any = {}
  protected readonly classTransformer: any = {}
  protected readonly isTransformEnabled: boolean
  protected readonly validatorOptions: ValidatorOptions
  protected readonly transformerOptions?: ClassTransformOptions
  protected readonly customTransformClass?: new (...args) => any | undefined

  constructor(options?: ValidateAndTransformPipeOptions) {
    options = options || {}
    const { validator, transformer, customTransformClass } = options
    this.isTransformEnabled = !!transformer
    this.validatorOptions = validator || {}
    this.transformerOptions = transformer || {}
    this.customTransformClass = customTransformClass

    const loadPkg = pkg => loadPackage(pkg, "ValidationPipe")
    this.classValidator = loadPkg("class-validator")
    this.classTransformer = loadPkg("class-transformer")
  }

  async transform(value, metadata: ArgumentMetadata) {
    const metatype = this.getMetaType(metadata)

    if (!metatype || !this.toValidate(metadata)) {
      return value
    }

    // metatype class must be without @Exclude() decorator, because ignoreDecorators option doesn't work with @Exclude()
    const entity = plainToClass(metatype, value, { ignoreDecorators: true, strategy: "exposeAll" })
    const errors: any = await validate(entity, this.validatorOptions)
    if (errors.length > 0) {
      throw new UnprocessableEntityException(getFlatValidationErrors(errors))
    }

    return this.isTransformEnabled ? plainToClass(metatype, value, this.transformerOptions) : value
  }

  protected toValidate(metadata: ArgumentMetadata): boolean {
    const { type } = metadata
    if (type === "custom") {
      return false
    }

    const metatype = this.getMetaType(metadata)

    const types = [String, Boolean, Number, Array, Object]
    return !types.find(t => metatype === t) && !isNil(metatype)
  }

  protected getMetaType(metadata: ArgumentMetadata): new (...args) => any | undefined {
    const { metatype } = metadata

    // @ts-ignore TODO some trouble with type definition
    return this.customTransformClass ? this.customTransformClass : metatype
  }
}
