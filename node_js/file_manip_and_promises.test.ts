import main from "./file_manip_and_promises";
describe("main", () => {
  it("check that it works with the a provided file", async () => {
    expect(await main()).toEqual(300);
  });
});
