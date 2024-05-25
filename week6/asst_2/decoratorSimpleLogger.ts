

// Asst2 -- Explorting Decorators in TypeScript
// Keiffer Tan


// Part 1 -- Creating a Class Decorator

function SimpleLogger<T extends { new (...args: any[]): {}}>(constructor: T) {
    console.log(`Class created: ${constructor.name} --from decorator!`);  
}

// function SimpleLogger(constructor: any) {
//     console.log(`Class created: ${constructor.name} --from decorator!!`);  
// }

// Part 2 -- Method and Accessor Decorators

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Method ${propertyKey} called`);
        return originalMethod.apply(this, args);
    };

    return descriptor;
}


@SimpleLogger
class MyTestClass {

    constructor() {
        console.log('MyClass instance Created! --from constructor');
    }

    @LogMethod
    myMethod(arg: string) {
        return `Argument received: ${arg}`
    }
}

// For testing the output
const myTestInstance = new MyTestClass();
myTestInstance.myMethod('text');