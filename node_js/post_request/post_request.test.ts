import supertest from "supertest";
import app from "./post_request_challenge";

const tester = supertest(app);
describe("Running Post tests", () => {
  it("ensure post /data doesn't throw", async () => {
    const res = await tester
      .post("/data")
      .send({ nums: generateNRandomInts(500) });
    expect(res.body.message).toEqual("Data Received successfully.");
    expect(res.statusCode).toEqual(201);
  });
});

function generateNRandomInts(n: number): number[] {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(Math.ceil(Math.random() * 200));
  }
  return result;
}
