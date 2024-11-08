import { ArrayNotEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ArrayNotEmpty()
    roles: string[];

    createdBy: string;
}
