// You are given a record of the historical prices of an investment asset from the last N days. Analyze the record in order to calculate what could have been your maximum income.
//Assume you started with one asset of this type and could hold at most one at a time. You could choose to sell the asset whenever you held one.
//If you did not hold an asset at some moment, you could always afford to buy an asset (assume you had infinite money available).
// What is the maximum income you could make?
// Write a function:
// function solution (A);
// that, given an array A of length N representing a record of prices over the last N days, returns the maximum income you could make.
// As the result may be large, return its last nine digits without leading zeros (return the result modulo 1,000,000,000).
// Examples:
// 1. Given A = [4, 1, 2, 3], the function should return 6. You could sell the product on the first day (for 4), buy it on the second (for 1) and sell it again on the last day (for 3). The income would be equal 4 - 1+3=6.
// 2. Given A = [1, 2, 3, 3, 2, 1, 5], the function should return 7. You could sell the product when its value was 3, buy it when it changed to 1, and sell it again when it was worth 5.
// 3. Given A = [1000000000, 1, 2, 2, 1000000000, 1, 1000000000], the function should return 999999998. The maximum possible income is 2999999998, whose last 9 digits are 999999998.
// Write an efficient algorithm for the following assumptions:
// ⚫ N is an integer within the range [1..200,000];
// ⚫ each element of array A is an integer within the range [0..1,000,000,000).

import assert from "assert";

const mod = 1e9;

function solution(arr: number[]): number {
  const n = arr.length;
  const memo: { [key: string]: number } = {};

  function dfs(profit: number, isBuying: boolean, i: number): number {
    let key = `${profit},${isBuying ? 0 : 1},${i}`;
    if (memo[key] != undefined) {
      return memo[key];
    }
    if (i === n) {
      return (memo[key] = profit);
    }

    let maxProfit = Number.NEGATIVE_INFINITY;
    if (isBuying) {
      maxProfit = Math.max(
        dfs(profit - arr[i], false, i + 1),
        dfs(profit, true, i + 1)
      );
    } else {
      maxProfit = Math.max(
        dfs(profit + arr[i], true, i + 1),
        dfs(profit, false, i + 1)
      );
    }
    memo[key] = maxProfit;
    return memo[key];
  }
  return dfs(0, false, 0) % mod;
}

assert.equal(solution([4, 1, 2, 3]), 6);
assert.equal(solution([1, 2, 3, 3, 2, 1, 5]), 7);
assert.equal(
  solution([1000000000, 1, 2, 2, 1000000000, 1, 1000000000]),
  999999998
);
