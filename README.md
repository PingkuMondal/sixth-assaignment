
---
1. Get 🌴All Plants
```bash
https://openapi.programming-hero.com/api/plants
```

2. Get 🌴All categories <br/>
```bash
https://openapi.programming-hero.com/api/categories
```


3. Get 🌴plants by categories <br/>
```bash
https://openapi.programming-hero.com/api/category/${id}
```

```bash
https://openapi.programming-hero.com/api/category/1
```

4. Get 🌴Plants Detail <br/>

```bash
https://openapi.programming-hero.com/api/plant/${id}
```

```bash
https://openapi.programming-hero.com/api/plant/1
```










#### 1) What is the difference between var, let, and const?
var- Although it is limited to the function, it can be accessed from outside the block. The value can also be changed by declaring it repeatedly. Hoisting If used before declaring, the value becomes undefined.

let-It is limited only within the block. The same scope has to be declared once, but the value can be changed. This is done in the case of changing the value.

const-It is used for permanent values. Once the value is given, it cannot be changed. It cannot be declared again and only works inside a block.

#### 2) What is the difference between map(), forEach(), and filter()? 
map()-It operates on each element and returns a new array. It is usually used to transform arrays. It can also be used to implement simple functions.
example:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);
output is [2, 4, 6, 8, 10].

forEach()-It basically works like a for loop. It is used to execute any loop. But a for loop returns a value while a foreach loop does not return anything.
example:
const users = [
  { id: 1, name: "Pingku" },
  { id: 2, name: "diksha" },
  { id: 3, name: "Mohan" }
];

users.forEach(user => {
  console.log(`User ${user.id}: ${user.name}`);
});

output is 
User 1: Pingku
User 2: diksha
User 3: Mohan

filter()-It works according to the condition. It selects the element and returns a new array. It will keep only those elements whose condition is true. It is usually used to select elements within an array.
example:
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumber = numbers.filter(num => num % 2 === 0);
console.log(evenNumber);

output is [2, 4, 6].


#### 3) What are arrow functions in ES6?
Arrow function is a short way of writing function, which is called ES6. It makes the writing much shorter. There is no need to write much code. If the body of the function is one line then there is no need to write return. This basically makes the code simpler and shorter.

#### 4) How does destructuring assignment work in ES6?
Destructuring assignment means separating a value from an array/object and easily storing it in a variable.
Destructuring assignment is an ES6 feature that allows us to easily store the values ​​of an array or object in a separate variable. It works in different ways such as Array Destructuring, Object Destructuring, Nested Destructuring.
Array destructuring is position dependent.
example:
const array = [10, 20, 30];
const [x, y, z] = array;
console.log(x, y, z);
output is 10 20 30.

Object destructuring is key dependent.
example:
const person = { name: "Pingku", age: 30 };
const { name, age } = person;
console.log(name);
console.log(age);

output is Pingku.
output is 30.

Destructuring with nested or default values ​​is possible.
example:
const person = {
  id: 1,
  info: {
        name:"Pingku",
        age:30,
    email: "pingku010@gmail.com",
    city: "Khulna"
  }
};

const { info: { name, age, email, city  } } = person;
console.log(name, age, email, city); 

output is Pingku 30 pingku010@gmail.com Khulna.


#### 5) Explain template literals in ES6. How are they different from string concatenation?
In ES6, template literals are a new type of string that is written between backticks (``). This makes it easy to write multiple lines. You don't have to write \n to write a new line. Setting variables is easy. You can use the ${} symbol to place variables or expressions in a string and use any JavaScript expression.

In ES6, template literals are a new type of string that is written between backticks (``). Through this, multiple lines can be written easily. You don't have to write \n to write a new line. Variables are easy to insert. Variables or expressions can be inserted into strings using the ${} symbol and any JavaScript expression can be used.
In String Concatenation, expressions have to be calculated separately. \n is used to write a new line. Strings are concatenated using the (+) symbol.
Template literals make it easy to create strings, make the code clean and readable, whereas concatenation often becomes complex and long. It requires a lot of code.

example:string concatenation
const name = "Pingku";
const age = 30;
const text = "my name " + name + "and" + " my age " + age + ".";
console.log(text);

example:
const name = "Pingku";
const age = 30;
const text = `my name ${name} and my age ${age}.`;
console.log(text);
