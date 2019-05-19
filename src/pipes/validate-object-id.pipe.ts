import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

/**
 * @ignore
 */
@Injectable()
export class ValidateObjectId implements PipeTransform<string> {

  /**
   * Error Validation for typing for mongoose ID Format.
   * @param value String
   * @param metadata Argument
   */
  async transform(value: string, metadata: ArgumentMetadata) {

    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) { throw new BadRequestException('Invalid ID!'); }
    return value;

  }

}
