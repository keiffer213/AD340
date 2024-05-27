import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';

describe('DogsController', () => {
  let controller: DogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a dog', () => {
    const dog = controller.createDog({ name: 'Rex', age: 3 });
    expect(dog).toEqual({ id: 1, name: 'Rex', age: 3 });
  });

  it('should get all dogs', () => {
    controller.createDog({ name: 'Rex', age: 3 });
    controller.createDog({ name: 'Max', age: 5 });
    expect(controller.getAllDogs()).toHaveLength(2);
  });

  it('should get a dog by ID', () => {
    const dog = controller.createDog({ name: 'Rex', age: 3 });
    expect(controller.getDogById(dog.id)).toEqual(dog);
  });

  it('should update a dog', () => {
    const dog = controller.createDog({ name: 'Rex', age: 3 });
    const updatedDog = controller.updateDog(dog.id, { age: 4 });
    expect(updatedDog.age).toBe(4);
  });

  it('should delete a dog', () => {
    const dog = controller.createDog({ name: 'Rex', age: 3 });
    controller.deleteDog(dog.id);
    expect(() => controller.getDogById(dog.id)).toThrowError('Dog not found');
  });
});
