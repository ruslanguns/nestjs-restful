import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';

export class LoginUserDTO {

    readonly username: string;
    readonly email: string;
    password: string;
}
