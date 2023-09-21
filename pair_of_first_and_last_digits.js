const solution = (arr) => {
  const lastDigitCount = {};
  for (let num of arr) {
    let last = num % 10;
    lastDigitCount[last] = (lastDigitCount[last] || 0) + 1;
  }

  let result = 0.0;
  for (let num of arr) {
    while (num >= 10) {
      num = Math.floor(num / 10);
    }
    if (num in lastDigitCount) result += lastDigitCount[num];
  }
  return result;
};

console.log(solution([30, 12, 29, 91]));
console.log(solution([122, 21, 21, 23]));
