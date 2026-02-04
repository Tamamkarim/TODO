import { safeDivide } from './math.js';

// 1. Scoping example
const x = 1;
let y = 2;
console.log('Outside block:', x, y);
{
  const x = 10;
  let y = 20;
  console.log('Inside block:', x, y);
}
console.log('After block:', x, y);

// 2. Template literals + ternary
const describeAge = (name, age) => {
  const category = age >= 18 ? 'Adult' : 'Minor';
  return `${name} is ${age} years old (${category})`;
};

console.log(describeAge('Alice', 20));
console.log(describeAge('Bob', 15));


const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);

const nums = [1, 2, 3];
console.log('Sum of numbers:', sum(...nums, 4));

// 4. Destructuring
const user = {
  name: 'Alice',
  address: { city: 'Wonderland', postalCode: '12345' },
};

const { name: fullName, address: { city } } = user;
console.log(`${fullName} lives in ${city}`);

// 5. Modules + error handling
try {
  const ok = safeDivide(10, 2);
  console.log('10 / 2 =', ok);

  const fail = safeDivide(10, 0);
  console.log('10 / 0 =', fail);
} catch (error) {
  console.error('Caught error from safeDivide:', error.message);
} finally {
  console.log('Finished safeDivide examples');
}

// 6. Arrow function + template literal
const greet = (name) => `Hello, ${name}!`;
console.log(greet('Alice'));

// 7. Array destructuring
const numbers = [10, 20, 30, 40];
const [firstNumber, secondNumber] = numbers;
console.log(firstNumber, secondNumber);

// 8. Optional chaining + fallback
const getCityOrFallback = (person) => person.address?.city || 'Unknown city';

const p1 = { address: { city: 'Helsinki' } };
const p2 = {};

console.log(getCityOrFallback(p1));
console.log(getCityOrFallback(p2));
