import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    ParseIntPipe,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // this will handle parent /users route
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    // this creates a singleton
    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=value
    // To get a query param for a role "http://localhost:3000/users?role=ADMIN"
    //the ? means that it is optional
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role);
    }

    @Get(':id') //GET /users/:id
    //bind the param with a pipe to transform the data
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id); //using unary "+" to convert to an int

        // When the function was: findOne(@Param('id') id: string) {
        // return this.usersService.findOne(+id); //using unary "+" to convert to an int
    }

    @Post() // POST /users
    create(
        @Body(ValidationPipe) //ValidationPipe will validate against the Dto
        createUserDto: CreateUserDto, //typically the variable used in the lowercase of the Dto
        // user: CreateUserDto,       //user and createUserDto represent the same thing
        // needed the below to define the user, but because we created a CreateUserDto we don't need to define it anymore
        // user: {
        //     name: string;
        //     email: string;
        //     role: 'INTERN' | 'ENGINEER' | 'ADMIN';
        // },
    ) {
        // return this.usersService.create(user);
        return this.usersService.create(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto,
        // Same as above, we created a custom Dto for userUpdate type
        // updateUserDto: {
        //     name?: string;
        //     email?: string;
        //     role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
        // },
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
