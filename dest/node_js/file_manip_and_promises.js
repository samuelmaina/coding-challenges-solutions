"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
// Implement a function that takes an object and multiply it's value by a constant and returns a promise
function calculateItem(item) {
    const k = 2;
    return new Promise((resolve, reject) => {
        try {
            if (isSettled(item))
                resolve(Number(Math.abs(item.value) * k));
            else {
                resolve(0);
            }
        }
        catch (_a) {
            reject("Something wrong just happened");
        }
    });
}
// Implement a function that returns true for "settled" items
function isSettled(item) {
    return item.status === "settled";
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(yield promises_1.default.readFile("resources/data.json", {
            encoding: "utf-8",
        }));
        // For each item in the array that is "settled"
        // Multiply its absolute value by 2
        // Sum up results
        let calculatedValue = data.reduce((prev, curr) => {
            {
                //@ts-ignore
                calculateItem(curr).then((val) => {
                    prev += val;
                });
                return prev;
            }
        }, 0);
        console.log(calculatedValue);
        return calculatedValue;
    });
}
exports.default = main;
