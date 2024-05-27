import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';

// Define the shape of Dog object for a strict structure
interface Dog {
  id: number;
  name: string;
  age: number;
}

// Main class for handling dog-related routes w/ a base URL '/dogs'
@Controller('dogs')
export class DogsController {
  private dogs: Dog[] = [];
  private idCounter: number = 1;

  // This is to retrieve all the dog data when at "/dogs"
  @Get()
  getAllDogs(): Dog[] {
    // it is good to return 'this.dogs' because NestJS framework automatically
    // serializes the array to JSON.
    console.log('Retrieve all dog data'); //For debugging purposes
    return this.dogs; //returns direct array of dog objects
  }

  // Create a new dog
  @Post()
  createDog(@Body() createDogDto: { name: string; age: number }): Dog {
    //create a new dog object by combining the request body with an id that increments
    const newDog = {
      id: this.idCounter++,
      ...createDogDto,
    };
    this.dogs.push(newDog); //add dog to array
    return newDog;
  }

  // Retrieve dog data by id
  @Get(':id') //maps HTTP GET requests on '/dogs/:id'
  getDogById(@Param('id') id: number): Dog {
    console.log(`Fetching dog with id = ${id}`); //For debugging purposes
    const dog = this.dogs.find((dog) => dog.id === Number(id)); //I was having trouble
    if (!dog) {
      throw new NotFoundException('Dog not found');
    }
    return dog;
  }

  // Update dog information by id
  @Put(':id')
  updateDog(
    @Param('id') id: number,
    @Body() updateDogDto: { name?: string; age?: number },
  ): Dog {
    const dogIndex = this.dogs.findIndex((d) => d.id === Number(id));
    if (dogIndex === -1) {
      throw new NotFoundException('Dog not found for updating!');
    }
    const updatedDog = {
      ...this.dogs[dogIndex],
      ...updateDogDto,
    };
    this.dogs[dogIndex] = updatedDog;
    console.log(`Updated dog with id = ${id}`); //For debugging purposes
    return updatedDog;
  }

  // Delete dog by id
  @Delete(':id')
  remove(@Param('id') id: number): string {
    const dogIndex = this.dogs.findIndex((d) => d.id === Number(id));
    if (dogIndex === -1) {
      throw new NotFoundException('Dog not found, cannot delete!');
    }
    this.dogs.splice(dogIndex, 1);
    console.log(`Delete dog with id = ${id}`); //For debugging purposes
    return `Successfully deleted dog id=${id}`;
  }
}
