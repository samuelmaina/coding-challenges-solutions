// Create a REST API using any language or web framework you prefer, which performs the following functionality:

// Provides a POST endpoint at /data where a user submits a JSON formatted list of 500 random numbers. The list has to be exactly 500 numbers,
// if there are more or less than 500 an error must be returned. Similarly, if something other than a list of numbers is submitted, an error must be returned.
// Provides a GET endpoint at /data which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
// BONUS:

// Provides a PATCH endpoint at /data which allows insertion of a single number into the list which gets placed in the proper order.

import express, { Express, NextFunction, Request, Response } from "express";
import fs from "fs/promises";

const app: Express = express();
app.use(express.json());
app.post("/data", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let data = req.body;
    if (data["nums"] === undefined) {
      res.statusCode = 400;
      return res.json({ message: "There is no nums prop in the body." });
    }
    const nums: number[] = data.nums;
    if (nums.length < 500) {
      res.statusCode = 400;
      return res.json({ message: "Way too few numbers received." });
    }
    if (nums.length > 500) {
      res.statusCode = 400;
      return res.json({ message: "Way too many numbers received." });
    }

    await fs.writeFile("data.json", JSON.stringify(data));
    res.statusCode = 201;
    return res.json({
      message: "Data Received successfully.",
    });
  } catch (error) {
    next(error);
  }
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.statusCode !== 500) {
    return res.json({
      message: err.message,
    });
  }

  res.statusCode = 500;
  res.json({
    message: "Internal Server Error Occurred. Please try again later.",
  });
  return res;
};

app.use(errorHandler);
export default app;
