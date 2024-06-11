import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'Keiffer Tan',
            email: 'keiffer213@gmail.com',
            role: 'ADMIN',
        },
        {
            id: 2,
            name: 'Kathryn Cuento',
            email: 'kathryncuento@gmail.com',
            role: 'ENGINEER',
        },
        {
            id: 3,
            name: 'Andres Bauch',
            email: 'andresbauch@gmail.com',
            role: 'INTERN',
        },
        {
            id: 4,
            name: 'Amelia Rinaldi Thermopalis',
            email: 'amerliart@gmail.com',
            role: 'INTERN',
        },
        {
            id: 5,
            name: 'Reginald Tompkin',
            email: 'reginaldtom@yahoo.com',
            role: 'ENGINEER',
        },
        {
            id: 6,
            name: 'Polly Pocket',
            email: 'pollyp@outlook.com',
            role: 'INTERN',
        },
        // {
        //     "id": 1,
        //     "name": "Keiffer Tan",
        //     "email": "keiffer213@gmail.com",
        //     "role": "ADMIN",
        // },
        // {
        //     "id": 2,
        //     "name": "Kathryn Cuento",
        //     "email": "kathryncuento@gmail.com",
        //     "role": "ENGINEER",
        // },
        // {
        //     "id": 3,
        //     "name": "Andres Bauch",
        //     "email": "andresbauch@gmail.com",
        //     "role": "INTERN",
        // },
        // {
        //     "id": 4,
        //     "name": "Amelia Rinaldi Thermopalis",
        //     "email": "amerliart@gmail.com",
        //     "role": "INTERN",
        // },
        // {
        //     "id": 5,
        //     "name": "Reginald Tompkin",
        //     "email": "reginaldtom@yahoo.com",
        //     "role": "ENGINEER",
        // },
        // {
        //     "id": 6,
        //     "name": "Polly Pocket",
        //     "email": "pollyp@outlook.com",
        //     "role": "INTERN",
        // },
    ];

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            // Rather than just returning an empty array if role isn't found, add a bit more logic
            // return this.users.filter((user) => user.role === role);

            const rolesArray = this.users.filter((user) => user.role === role);
            //can also user if (!rolesArray.length)
            if (rolesArray.length === 0)
                throw new NotFoundException('User Role Not Found');
            //otherwise, just return the array
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((user) => user.id === id);

        // thorw a custom error message if user not found, b/c without this, it returns an empty object
        if (!user) throw new NotFoundException('User Not Found');

        return user;
    }

    create(
        // generally the variable is the camelCase version of Dto
        createUserDto: CreateUserDto, //from defining object structure manually, use Dto instead
        // user: {
        //     name: string;
        //     email: string;
        //     role: 'INTERN' | 'ENGINEER' | 'ADMIN'; }
    ) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        // sort((a,b) => b.id - a.id) will sort from descending order
        // [...this.users] creates a shallow copy to not mutate original array

        // create a newUser object with a unique id and the passed in params
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto,
        };

        this.users.push(newUser); //add the newUser object into the array
        return newUser;
    }

    update(
        id: number,
        updateUserDto: UpdateUserDto, //same as above use dto for cleaner code
        // updatedUser: {
        //     name?: string;
        //     email?: string;
        //     role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
        // },
    ) {
        // update users array by mapping
        this.users = this.users.map((user) => {
            if (user.id === id) {
                // if id matches, return a new user object with updated fields
                return { ...user, ...updateUserDto };
            }
            //if id doesn't match, return untouched user object
            return user;
        });

        // return updated user by calling another method findOne(id)
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);

        this.users = this.users.filter((user) => user.id !== id);

        return removedUser;
    }
}
