import { IsString, IsDate, IsNotEmpty, IsBoolean, IsEmail, Length, MaxLength } from 'class-validator';

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    @Length(3, 200)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    readonly role: string;

    readonly createdAt?: Date;

    modifiedAt: Date;

    readonly status: boolean;
}
