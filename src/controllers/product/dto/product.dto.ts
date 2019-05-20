import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * @ignore
 */
export class CreateProductDTO {

    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly imageURL: string;

    @IsNotEmpty()
    readonly price: number;

    readonly createdAt: Date;
}
