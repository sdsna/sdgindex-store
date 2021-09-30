import createStore from "@sdgindex/store";

let findRecord, addRecord;

beforeEach(() => {
  ({ findRecord, addRecord } = createStore({
    collections: [{ name: "elephants" }],
  }));
});

it("returns the record from the store", () => {
  addRecord("elephants", { id: "BIG ELEPHANT", name: "Jeremy" });

  expect(findRecord("elephants", "BIG ELEPHANT")).toEqual({
    id: "BIG ELEPHANT",
    name: "Jeremy",
  });
});

describe("when record with ID does not exist", () => {
  it("returns undefined", () => {
    expect(findRecord("elephants", 1)).toBe(undefined);
  });
});

// Ensure objects are deeply cloned
describe("when making changes to the returned object", () => {
  it("does not modify object in the store", () => {
    addRecord("elephants", { id: 1, color: { ears: "gray", legs: "brown" } });

    const elli = findRecord("elephants", 1);
    elli.color.ears = "brown";

    expect(findRecord("elephants", 1)).toEqual({
      id: 1,
      color: { ears: "gray", legs: "brown" },
    });
  });
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => findRecord("giraffes", 1)).toThrowError(
      "Collection with name giraffes does not exist."
    );
  });
});
