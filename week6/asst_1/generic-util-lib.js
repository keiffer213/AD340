"use strict";
// Week 6 Assignment -- Building a Generic Utility Library in TypeScript
// Keiffer Tan
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// Part 2 -- Generic identity Function
function identity(arg) {
    return arg;
}
var result = identity(5);
var result2 = identity("Hello World!");
console.log("\n\nPart 2 -- Generic identity Function");
console.log(result, result2, "\n");
// Part 3 -- Generic Array Reversal Function
function reverseArray(arg) {
    return __spreadArray([], arg, true).reverse();
    //use spread operator to create a copy, otherwise it will modify
    //the original array as well
}
var arr1 = [1, 2, 3, 4, 5];
var cars = ["Volvo", "Toyota", "BMW", "Volkswagen"];
var resultArr = reverseArray(arr1);
var resultCar = reverseArray(cars);
console.log("\n\nPart 3 -- Generic Array Reversal Function");
console.log(arr1, cars);
console.log(resultArr, resultCar, "\n");
// Part 4 -- Generic Object Mapper
// K extends ensures that the types will be string, number, or symbol
function mapObject(obj, //this makes sure value K is of type V
mapFn // mapping function tha takes value of type "V" and returns value of type "U"
) {
    var result = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = mapFn(obj[key]);
        }
    }
    return result;
}
var obj = { a: 1, b: 2 };
var mappedObj = mapObject(obj, function (x) { return x.toString(); });
console.log("\n\nPart 4 -- Generic Object Mapper");
console.log(obj); // Output: { a: 1, b: 2 }
console.log(mappedObj); // Output: { a: "1", b: "2" }
// Part 5 -- Generic Filtering Function
// predicate indicates that 2nd param is a function that takes an item of 'T' & returns boolean val
function filterArray(array, predicate) {
    // Manual way of achieving .filter
    var array2 = [];
    for (var i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            array2.push(array[i]);
        }
    }
    // I can use the .filter function to filter as well!
    // let array2 = array.filter(predicate);
    return array2;
}
var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log("\n\nPart 5 -- Generic Filtering Function");
console.log("filtered array:", filterArray([1, 2, 3, 4], function (x) { return x % 2 === 0; }));
console.log("Original 2nd Array:", arr2);
console.log("2nd filtered array:", filterArray(arr2, function (x) { return x % 2 === 0; }));
