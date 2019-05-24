import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * @ignore
 */
export class CreateProductDTO {

    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @ApiModelProperty()
    readonly description: string;

    @IsString()
    @ApiModelProperty()
    readonly imageURL: string;

    @IsNotEmpty()
    @ApiModelProperty()
    readonly price: number;

    readonly createdAt: Date;
}
