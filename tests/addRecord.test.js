import createStore from "@sdgindex/store";

let addRecord, getRecords, findRecord;

beforeEach(() => {
  ({ addRecord, getRecords, findRecord } = createStore({
    collections: [{ name: "cats" }],
  }));
});

it("can add records", () => {
  addRecord("cats", { id: 1, color: "orange" });
  addRecord("cats", { id: 2, size: "large" });

  expect(getRecords("cats")).toEqual([
    { id: 1, color: "orange" },
    { id: 2, size: "large" },
  ]);
});

it("cannot modify added records", () => {
  const cat = { id: 1, name: "Tipsy" };
  addRecord("cats", cat);

  cat.name = "Jerry";

  expect(findRecord("cats", 1)).toEqual({ id: 1, name: "Tipsy" });
});

describe("when adding a record to a non-existent collection", () => {
  it("throws an error", () => {
    expect(() => addRecord("dogs", { id: 1, breed: "shepherd" })).toThrowError(
      "Collection with name dogs does not exist."
    );
  });
});

describe("when record is missing an ID", () => {
  it("automatically assigns an ID", () => {
    addRecord("cats", { age: 2 });
    expect(findRecord("cats", 1)).toEqual({ id: 1, age: 2 });
  });
});

describe("when record is using duplicate ID", () => {
  it("throws an error", () => {
    addRecord("cats", { id: 1, name: "Cat1" });
    expect(() => addRecord("cats", { id: 1, name: "Cat2" })).toThrowError(
      "Record with ID 1 already exists in cats."
    );
  });
});
