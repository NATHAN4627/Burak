// M Task
interface SquareArray {
  number: number;
  square: number;
}

function getSquareNumbers(nums: number[]): SquareArray[] {
  return nums.map((num) => ({
    number: num,
    square: num * num,
  }));
}

console.log(getSquareNumbers([1, 2, 3, 4, 5]));

// L Task
// function reverseSentence(input: string): string {
//   return input
//     .split(" ")
//     .map((word) => word.split("").reverse().join(""))
//     .join(" ");
// }

// console.log(reverseSentence("MIT group"));
