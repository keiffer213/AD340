import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

// the following extends the CreateUserDto but it won't require every field, it makes the fields optional
// need to install "npm i @nestjs/mapped-types -D" since it isn't installed by default and the -D is for the dev dependency
export class UpdateUserDto extends PartialType(CreateUserDto) {}
