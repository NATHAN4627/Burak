// L Task
function reverseSentence(input: string): string {
  return input
    .split(" ")
    .map((word) => word.split("").reverse().join(""))
    .join(" ");
}

console.log(reverseSentence("MIT group"));
