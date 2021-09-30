import createStore from "@sdgindex/store";
import { issueId as unboundIssueId } from "private:@sdgindex/store/issueId";

let issueId, addRecord;

beforeEach(() => {
  const store = createStore({
    collections: [{ name: "kangaroos" }],
  });
  store.issueId = unboundIssueId.bind(store);

  ({ addRecord, issueId } = store);
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
