import createStore from "@sdgindex/store";

let hasCollection;

beforeEach(() => {
  ({ hasCollection } = createStore({
    collections: [{ name: "fish" }, { name: "ants" }],
  }));
});

it("returns true for collection 'fish'", () => {
  expect(hasCollection("fish")).toBe(true);
});

it("returns true for collection 'ants'", () => {
  expect(hasCollection("ants")).toBe(true);
});

it("returns false for collection 'bears'", () => {
  expect(hasCollection("bears")).toBe(false);
});
