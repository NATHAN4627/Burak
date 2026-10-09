// T Task

function mergeSortedArrays(nums1: number[], nums2: number[]): number[] {
  const res = [...nums1, ...nums2];
  return res.sort((a, b) => a - b);
}

console.log(mergeSortedArrays([3, 6, 12, 1], [60, 9, 0, 7]));

// S Task

// function missingNumber(nums: number[]): number {
//   nums.sort();
//   for (let i = 0; i < nums.length; i++) {
//     if (i !== nums[i]) return i;
//   }
//   return nums.length;
// }

// console.log(missingNumber([0, 1, 2, 3, 5]));

// R Task

// function calculate(inputs: string): number {
//   let res = 0;
//   const splitted = inputs.split("+");
//   for (const split of splitted) {
//     res += Number(split);
//   }
//   return res;
// }

// console.log(calculate("1+7"));

// Q Task

// function hasProperty(obj: Record<string, any>, str: string): boolean {
//   const values = Object.values(obj);
//   return values.includes(str);
// }

// console.log(hasProperty({ group: "MIT" }, "MIT"));

// P Task

// function objectToArray(input: any): any[][] {
//   return Object.entries(input);
// }

// console.log(
//   objectToArray({
//     name: "Nathan",
//     age: 21,
//   })
// );

// O Task

// function calculateSumOfNumbers(input: any[]): number {
//   let res = 0;
//   input.forEach((num) => {
//     if (typeof num === "number") {
//       return (res += num);
//     }
//   });
//   return res;
// }

// console.log(calculateSumOfNumbers([10, "15", 43, { number: 25 }]));

// N Task

// function palindromCheck(input: string): boolean {
//   const reverseInput = input.toLowerCase().split("").reverse().join("");
//   if (input.toLowerCase() === reverseInput) {
//     return true;
//   }
//   return false;
// }

// console.log(palindromCheck("abbA"));

// M Task
// interface SquareArray {
//   number: number;
//   square: number;
// }

// function getSquareNumbers(nums: number[]): SquareArray[] {
//   return nums.map((num) => ({
//     number: num,
//     square: num * num,
//   }));
// }

// console.log(getSquareNumbers([1, 2, 3, 4, 5]));

// L Task
// function reverseSentence(input: string): string {
//   return input
//     .split(" ")
//     .map((word) => word.split("").reverse().join(""))
//     .join(" ");
// }

// console.log(reverseSentence("MIT group"));
