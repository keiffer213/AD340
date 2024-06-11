import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
// use "npm i class-validator class-transformer"

// apply validation decorators & no need to apply to UpdateUsersDto b/c it is exntending CreateUsersDto
// Can't check requests coming in until we apply validation pipe
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail() //check to make sure it is an email
    email: string;

    //ensures that roles are valid input using class validator
    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Valid role required',
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
