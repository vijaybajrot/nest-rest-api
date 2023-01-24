import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema, ValidationError } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    console.log('error :>> ', error);
    if (error) {
      throw new UnprocessableEntityException({
        statusCode: 422,
        error: 'Validation',
        message: 'Validation failed',
        errorDetails: this.generateErrorDetails(error),
      });
    }
    return value;
  }

  generateErrorDetails(error: ValidationError) {
    return error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
  }
}
