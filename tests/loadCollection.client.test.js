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
  mockFetch({ dolphins: { data: "test" } });

  await loadCollection("dolphins");

  expect(data).toHaveProperty("dolphins", { data: "test" });
});

it("marks the collection as loaded", async () => {
  mockFetch({ dolphins: {} });
  await loadCollection("dolphins");
  expect(hasLoadedCollection("dolphins")).toBe(true);
});

describe("when returning multiple keys in dataset", () => {
  it("loads both keys into the store", async () => {
    mockFetch({
      dolphins: { data: "test" },
      whales: { myEncoding: [1, 2, 3] },
    });

    await loadCollection("dolphins");

    expect(data).toHaveProperty("dolphins", { data: "test" });
    expect(data).toHaveProperty("whales", { myEncoding: [1, 2, 3] });
  });
});

describe("when loading collection repeatedly", () => {
  it("only loads data once", async () => {
    mockFetch({ dolphins: {} });
    await loadCollection("dolphins");
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Additional calls of the function does not re-trigger loading
    await loadCollection("dolphins");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe("when several collections share a file", () => {
  beforeEach(() => {
    ({ loadCollection, hasLoadedCollection, data } = createStore({
      collections: [{ name: "dolphins" }, { name: "whales", file: "dolphins" }],
    }));
  });

  it("loads both collections", async () => {
    mockFetch({ dolphins: { data: "dolphins" }, whales: { data: "whales" } });

    await loadCollection("dolphins");

    expect(data).toHaveProperty("dolphins", { data: "dolphins" });
    expect(hasLoadedCollection("dolphins")).toBe(true);
    expect(data).toHaveProperty("whales", { data: "whales" });
    expect(hasLoadedCollection("whales")).toBe(true);
  });
});
