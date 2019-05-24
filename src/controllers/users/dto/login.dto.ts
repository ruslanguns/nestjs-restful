import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDTO {

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly email: string;

    @ApiModelProperty()
    password: string;
}
