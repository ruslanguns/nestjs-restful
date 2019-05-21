import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';

export class UserDTO {

    readonly firstName?: string;
    readonly lastName?: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly avatar?: string;
    readonly bio?: string;
    readonly role?: string;
    readonly createdAt?: Date;
    readonly modifiedAt?: Date;
    readonly status?: boolean;
}
