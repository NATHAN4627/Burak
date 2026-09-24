// N Task

function palindromCheck(input: string): boolean {
  const reverseInput = input.toLowerCase().split("").reverse().join("");
  if (input.toLowerCase() === reverseInput) {
    return true;
  }
  return false;
}

console.log(palindromCheck("abbA"));

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
