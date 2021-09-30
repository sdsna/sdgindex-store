import createStore from "@sdgindex/store";

let getCollection, addRecord;

beforeEach(() => {
  ({ getCollection, addRecord } = createStore({
    collections: [{ name: "bees" }],
  }));
});

it("returns an array of objects from the collection", () => {
  addRecord("bees", { id: 1, hive: "forest" });
  addRecord("bees", { id: 2, hive: "mountain" });
  addRecord("bees", { id: 3, hive: "meadow" });

  expect(getCollection("bees")).toEqual([
    { id: 1, hive: "forest" },
    { id: 2, hive: "mountain" },
    { id: 3, hive: "meadow" },
  ]);
});

describe("when no objects have been added yet", () => {
  it("returns an empty array", () => {
    expect(getCollection("bees")).toEqual([]);
  });
});

// Ensure objects are deeply cloned
describe("when making changes to the returned objects", () => {
  it("does not modify objects in the store", () => {
    addRecord("bees", { id: 1, hive: "forest" });

    const [bee] = getCollection("bees");
    bee.hive = "shore";

    expect(getCollection("bees")).toEqual([{ id: 1, hive: "forest" }]);
  });
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => getCollection("bunnies")).toThrowError(
      "Collection with name bunnies does not exist."
    );
  });
});
