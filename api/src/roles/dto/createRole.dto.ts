import { ArrayNotEmpty, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    name: string;

    @ArrayNotEmpty()
    permissions: string[];

    createdBy: string;
}
