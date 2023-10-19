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
  it("ensure post /data throws when their is no nums prop", async () => {
    const res = await tester
      .post("/data")
      .send({ random: generateNRandomInts(500) });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("There is no nums prop in the body.");
  });
  it("ensure post /data throws when the nums prop has less than 500 nums", async () => {
    const res = await tester
      .post("/data")
      .send({ nums: generateNRandomInts(499) });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Way too few numbers received.");
  });
  it("ensure post /data throws when the nums prop has more than 500 nums", async () => {
    const res = await tester
      .post("/data")
      .send({ nums: generateNRandomInts(501) });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("Way too many numbers received.");
  });
});

function generateNRandomInts(n: number): number[] {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(Math.ceil(Math.random() * 200));
  }
  return result;
}
