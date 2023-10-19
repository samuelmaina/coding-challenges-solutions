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
    console.log(data);
    await fs.writeFile("data.json", JSON.stringify(data));
    console.log(data);
    res.statusCode = 201;
    res.statusMessage = "Success";
    return res.json({
      message: "Data Received successfully.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.statusCode = 500;
  res.statusMessage = "This is an error";
  return res;
};

app.use(errorHandler);
export default app;
