"use strict";
// Asst2 -- Explorting Decorators in TypeScript
// Keiffer Tan
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//Need to do "tsc -p tsconfig.json" in the proper directory
//Then do a "node decoratorSimpleLogger.js"
// Part 1 -- Creating a Class Decorator
function SimpleLogger(constructor) {
    console.log(`Class created: ${constructor.name} --from decorator!`);
}
// function SimpleLogger(constructor: any) {
//     console.log(`Class created: ${constructor.name} --from decorator!!`);  
// }
// Part 2 -- Method and Accessor Decorators
// Method Decorator
function LogMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method ${propertyKey} called with args: ${args.join(', ')}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Acessor Decorator
function MyReadOnly(target, propertyKey, descriptor) {
    descriptor.set = function () {
        throw new Error(`Cannot set value of ${propertyKey}. It is read-only.`);
    };
    return descriptor;
}
// Another Accessor Decorator Using the following source:
//  https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.configurable = value;
    };
}
let MyTestClass = class MyTestClass {
    constructor() {
        this._var1 = 'private_var1';
        this.var2 = 'public_var2';
        this._var3 = 5;
        console.log('MyClass instance Created! --from constructor');
    }
    myMethod(arg) {
        return `Argument received: ${arg}`;
    }
    get var1() {
        return this._var1;
    }
    get var3() {
        return this._var3;
    }
};
__decorate([
    LogMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MyTestClass.prototype, "myMethod", null);
__decorate([
    MyReadOnly,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], MyTestClass.prototype, "var1", null);
__decorate([
    configurable(false),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], MyTestClass.prototype, "var3", null);
MyTestClass = __decorate([
    SimpleLogger,
    __metadata("design:paramtypes", [])
], MyTestClass);
// For testing the output
const myTestInstance = new MyTestClass();
let testString = myTestInstance.myMethod('test text');
console.log(testString);
// console.log("Var2:", myTestInstance.var2);
console.log("Var1:", myTestInstance.var1, "Var2:", myTestInstance.var2, "Var3: ", myTestInstance.var3);
// (myTestInstance as any).var1 = "new value"; // just this gives me an error when trying to compile
// (myTestInstance as any).var3 = 3;
// try {
//     Object.defineProperty(myTestInstance, 'var3', {
//         configurable: true,
//         value: 15
//     });
// } catch (error) {
//     console.error("Error when trying to redefine var3:", error.message);
// }
// Attempt to modify the value accessor should fail
try {
    myTestInstance.var1 = "new value"; // This line should cause an error
}
catch (error) {
    console.error(error.message); // output "Cannot set value of var1. It is read-only."
}
console.log("Var1:", myTestInstance.var1, "Var2:", myTestInstance.var2, "Var3: ", myTestInstance.var3);
