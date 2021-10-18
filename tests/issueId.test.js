import createStore from "@sdgindex/store";

let issueId, addRecord;

beforeEach(() => {
  ({ addRecord, issueId } = createStore({
    collections: [{ name: "kangaroos" }],
  }));
});

it("returns incrementing numeric IDs, starting with 1", () => {
  expect(issueId("kangaroos")).toEqual(1);
  expect(issueId("kangaroos")).toEqual(2);
  expect(issueId("kangaroos")).toEqual(3);
});

describe("when an ID already exists", () => {
  it("skips to the next ID", () => {
    addRecord("kangaroos", { id: 2 });

    expect(issueId("kangaroos")).toEqual(1);
    expect(issueId("kangaroos")).toEqual(3);
  });
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => issueId("wombats")).toThrowError(
      "Collection with name wombats does not exist."
    );
  });
});
