

// Asst2 -- Explorting Decorators in TypeScript
// Keiffer Tan

//Need to do "tsc -p tsconfig.json" in the proper directory
//Then do a "node decoratorSimpleLogger.js"


// Part 1 -- Creating a Class Decorator

function SimpleLogger<T extends { new (...args: any[]): {}}>(constructor: T) {
    console.log(`Class created: ${constructor.name} --from decorator!`);  
}

// function SimpleLogger(constructor: any) {
//     console.log(`Class created: ${constructor.name} --from decorator!!`);  
// }

// Part 2 -- Method and Accessor Decorators

// Method Decorator
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Method ${propertyKey} called with args: ${args.join(', ')}`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// Acessor Decorator
function MyReadOnly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.set = function () {
        throw new Error(`Cannot set value of ${propertyKey}. It is read-only.`);
    };
    return descriptor;
}

// Another Accessor Decorator Using the following source:
//  https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      descriptor.configurable = value;
    };
  }

@SimpleLogger
class MyTestClass {

    private _var1: string = 'private_var1';
    public var2: string = 'public_var2';
    private _var3: number = 5;

    constructor() {
        console.log('MyClass instance Created! --from constructor');
    }

    @LogMethod
    myMethod(arg: string) {
        return `Argument received: ${arg}`
    }

    @MyReadOnly
    get var1(): string {
        return this._var1;
    }

    @configurable(false)
    get var3(): number {
        return this._var3;
    }

    // @MyReadOnly
    // get var(): string {
    //     return this.var2;
    // }
}

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
    (myTestInstance as any).var1 = "new value";  // This line should cause an error
} catch (error) {
    console.error(error.message);  // output "Cannot set value of var1. It is read-only."
}

console.log("Var1:", myTestInstance.var1, "Var2:", myTestInstance.var2, "Var3: ", myTestInstance.var3);