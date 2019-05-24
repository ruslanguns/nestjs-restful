import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {


    @ApiModelProperty()
    readonly firstName?: string;

    @ApiModelProperty()
    readonly lastName?: string;

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly avatar?: string;

    @ApiModelProperty()
    readonly bio?: string;

    @ApiModelProperty()
    readonly role?: string;

    @ApiModelProperty()
    readonly createdAt?: Date;

    @ApiModelProperty()
    readonly modifiedAt?: Date;

    @ApiModelProperty()
    readonly status?: boolean;
}
