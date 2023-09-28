import fs from "fs/promises";

type Item = {
  status: string;
  value: number;
};

// Implement a function that takes an object and multiply it's value by a constant and returns a promise
function calculateItem(item: Item) {
  const k = 2;
  return new Promise<number>((resolve, reject) => {
    try {
      if (isSettled(item)) resolve(Number(Math.abs(item.value) * k));
      else {
        resolve(0);
      }
    } catch {
      reject("Something wrong just happened");
    }
  });
}

// Implement a function that returns true for "settled" items
function isSettled(item: Item) {
  return item.status === "settled";
}

export default async function main() {
  const data: [Item] = JSON.parse(
    await fs.readFile("resources/data.json", {
      encoding: "utf-8",
    })
  );

  // For each item in the array that is "settled"
  // Multiply its absolute value by 2
  // Sum up results

  let calculatedValue = data.reduce((prev: number, curr: Item): number => {
    {
      //@ts-ignore
      calculateItem(curr).then((val) => {
        prev += val;
      });
      return prev;
    }
  }, 0);
  return calculatedValue;
}
