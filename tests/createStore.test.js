import createStore from "@sdgindex/store";

it("returns store data and collections", () => {
  expect(createStore({ collections: [{ name: "cats" }] })).toMatchObject({
    data: { cats: {} },
    collections: { cats: { nextId: 1 } },
  });
});

it("returns all store functions", () => {
  expect(createStore()).toMatchObject({
    addCollection: expect.any(Function),
    hasCollection: expect.any(Function),
    getRecords: expect.any(Function),
    addRecord: expect.any(Function),
    hasRecord: expect.any(Function),
    findRecord: expect.any(Function),
  });
});

it("can pass collections to createStore", () => {
  const { hasCollection } = createStore({
    collections: [{ name: "cats" }, { name: "mice" }],
  });

  expect(hasCollection("cats")).toBe(true);
  expect(hasCollection("mice")).toBe(true);
  expect(hasCollection("dogs")).toBe(false);
});
