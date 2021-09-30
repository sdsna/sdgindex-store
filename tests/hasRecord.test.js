import createStore from "@sdgindex/store";

let hasRecord, addRecord;

beforeEach(() => {
  ({ hasRecord, addRecord } = createStore({
    collections: [{ name: "monkeys" }],
  }));
  addRecord("monkeys", { id: 1 });
  addRecord("monkeys", { id: "BIG-APE" });
});

it("returns true for record with ID 1", () => {
  expect(hasRecord("monkeys", 1)).toBe(true);
});

it("returns true for record with ID BIG-APE", () => {
  expect(hasRecord("monkeys", "BIG-APE")).toBe(true);
});

it("returns false for record with ID 137", () => {
  expect(hasRecord("monkeys", 137)).toBe(false);
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => hasRecord("chimps", 1)).toThrowError(
      "Collection with name chimps does not exist."
    );
  });
});
