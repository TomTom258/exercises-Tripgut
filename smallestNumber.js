// Highest possible number in the large dataset
const maxNumber = 100000;
// Randomly generated number which is missing
const missingNumber = Math.floor(Math.random() * maxNumber) + 1;
const largerDataset = generateLargeDataset(missingNumber, maxNumber);

// Fill an array with numbers apart from the missing one
function generateLargeDataset(missingNumber, maxNumber) {
  const arr = [];
  for (let i = 1; i <= maxNumber; i++) {
    if (i !== missingNumber) {
      arr.push(i);
    }
  }
  return arr;
}

// First linear approach that I was thinking about immediately
function smallestNumberLinear(arr) {
  // If I know that array is already sorted from min to max
  // I only need to increase the index incrementally
  // Obviously if the index don't match with the value at that index
  // I found the missing number
  // Issue is with cases where there are lot of numbers and
  // The missing numbers leads toward the end of the array
  // Time complexity O(N)

  // init to 1 because thats first number that we expect
  let expectedNumber = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== expectedNumber) {
      return expectedNumber;
    }
    expectedNumber++;
  }

  // if theres no missing number then maxvalue of that array plus 1 will be returned
  return expectedNumber;
}

// second approach after googling and rethinking
function smallestNumberBinary(arr) {
  // rather than going incrementally one by one
  // in binary search I split the array in half after each step
  // which in larger datasets means I have more chance to find
  // the correct number
  // Then based on (if mid index value is > or < than index plus 1)
  // I move left or right in the search using pointers until they cross each other
  // means there's nothing to left
  // Time complexity O(log N)

  // init left pointer to the beginning of the array
  let left = 0;
  // right pointer is obviously end of the array
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] > mid + 1) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  // I want to return the first occurence of such number so therefore left pointer
  return left + 1;
}

// Logger for measuring time between approaches
function logExecTime(func, arr, maxNumber) {
  const start = performance.now();
  const result = func(arr, maxNumber);
  const end = performance.now();
  return { result, time: end - start };
}

// Some primitive test cases
const testArray1 = [10, 16, 24, 25, 26];
const testArray2 = [1, 2, 3, 6, 7, 12];
const testArray3 = [1, 2, 3, 4, 5];
const testArray4 = [];

console.log("Linear Search:");
console.log(logExecTime(smallestNumberLinear, testArray1));
console.log(logExecTime(smallestNumberLinear, testArray2));
console.log(logExecTime(smallestNumberLinear, testArray3));
console.log(logExecTime(smallestNumberLinear, testArray4));

console.log("Binary Search:");
console.log(logExecTime(smallestNumberBinary, testArray1));
console.log(logExecTime(smallestNumberBinary, testArray2));
console.log(logExecTime(smallestNumberBinary, testArray3));
console.log(logExecTime(smallestNumberBinary, testArray4));

// Testing with larger dataset (set maxNumber to whatever value you wish)
// Run multiple times since there's possibility that generated missing
// number will be too low to effectively show the difference
// between approaches
console.log("Generated large dataset with missing number:", missingNumber);

console.log("Linear Search:");
console.log(logExecTime(smallestNumberLinear, largerDataset, maxNumber));

console.log("Binary Search:");
console.log(logExecTime(smallestNumberBinary, largerDataset, maxNumber));