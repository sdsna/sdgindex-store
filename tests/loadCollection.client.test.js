/**
 * @jest-environment jsdom
 */

import createStore from "@sdgindex/store";

let loadCollection, hasLoadedCollection, data;

beforeEach(() => {
  ({ loadCollection, hasLoadedCollection, data } = createStore({
    collections: [{ name: "dolphins" }],
  }));
});

afterEach(() => {
  delete global.fetch;
});

const mockFetch = (data) => {
  global.fetch = jest.fn().mockImplementation((url) => {
    if (url != "/data/dolphins.json") throw Error("Invalid request");

    return new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve(data),
      });
    });
  });
};

it("loads the dataset into the store via fetch", async () => {
  mockFetch({ data: "test" });

  await loadCollection("dolphins");

  expect(data).toHaveProperty("dolphins", { data: "test" });
});

it("marks the collection as loaded", async () => {
  mockFetch();
  await loadCollection("dolphins");
  expect(hasLoadedCollection("dolphins")).toBe(true);
});

describe("when returning multiple keys in dataset", () => {
  it("loads both keys into the store", async () => {
    mockFetch({ data: "test", myEncoding: [1, 2, 3] });

    await loadCollection("dolphins");

    expect(data).toHaveProperty("dolphins", {
      data: "test",
      myEncoding: [1, 2, 3],
    });
  });
});
