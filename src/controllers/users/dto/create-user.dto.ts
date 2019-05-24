import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    @ApiModelProperty()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(3, 200)
    @ApiModelProperty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    password: string;

    @ApiModelProperty()
    readonly role: string;

    readonly createdAt?: Date;

    modifiedAt: Date;

    @ApiModelProperty()
    readonly status: boolean;
}
