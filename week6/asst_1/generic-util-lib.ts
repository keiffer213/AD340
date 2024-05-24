// Week 6 Assignment -- Building a Generic Utility Library in TypeScript
// Keiffer Tan


// Part 2 -- Generic identity Function
function identity<Type>(arg: Type): Type {
    return arg;
}

const result = identity<number>(5);
const result2 = identity<string>("Hello World!");

console.log("\n\nPart 2 -- Generic identity Function")
console.log(result, result2, "\n");

// -------------------------------------------------------------------------------------------------
// Part 3 -- Generic Array Reversal Function

function reverseArray<T>(arg: T[]): T[] {
  return [...arg].reverse();
  //use spread operator to create a copy, otherwise it will modify
  //the original array as well
}

const arr1 = [1, 2, 3, 4, 5];
const cars = ["Volvo", "Toyota", "BMW", "Volkswagen"];

const resultArr = reverseArray(arr1);
const resultCar = reverseArray(cars);

console.log("\n\nPart 3 -- Generic Array Reversal Function")
console.log(arr1, cars)
console.log(resultArr, resultCar, "\n")

// -------------------------------------------------------------------------------------------------
// Part 4 -- Generic Object Mapper

// "K extends" ensures that the types will be string, number, or symbol
function mapObject<K extends string | number | symbol, V, U>(
  obj: Record<K, V>,     //this makes sure value K is of type V
  mapFn: (value: V) => U // mapping function tha takes value of type "V" and returns value of type "U"
): Record<K,U> {

  const result: Record<K, U> = {} as Record<K,U>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = mapFn(obj[key]);
    }
  }

  return result;
}

const obj = { a: 1, b: 2 };
const mappedObj = mapObject(obj, x => x.toString());

console.log("\n\nPart 4 -- Generic Object Mapper")
console.log(obj); // Output: { a: 1, b: 2 }
console.log(mappedObj); // Output: { a: "1", b: "2" }

// -------------------------------------------------------------------------------------------------
// Part 5 -- Generic Filtering Function

// This function will filter a given array with a given function
// 1st param is just an array of the passed parameter
// predicate indicates that 2nd param is a function that takes an item of 'T' & returns boolean val
function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  // Manual way of achieving .filter
  const array2: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      array2.push(array[i]);
    }
  }
  
  // I can use the .filter function to filter as well!
  // let array2 = array.filter(predicate);

  return array2;
}

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

console.log("\n\nPart 5 -- Generic Filtering Function")

console.log("filtered array:", filterArray<number>([1,2,3,4], x => x%2 === 0));
console.log("Original 2nd Array:", arr2);
console.log("2nd filtered array:", filterArray<number>(arr2, x => x%2 === 0));



export {};