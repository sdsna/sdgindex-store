/**
 * @jest-environment node
 */

import path from "path";
import { readJson } from "fs-extra";
import createStore from "@sdgindex/store";

let loadCollection, hasLoadedCollection, data;

beforeEach(() => {
  ({ loadCollection, hasLoadedCollection, data } = createStore({
    collections: [{ name: "hamsters" }],
  }));
});

jest.mock("fs-extra");

// Mock readJson() and return the given data
const mockReadJson = (data, dataPath = "public/data/hamsters.min.json") => {
  readJson.mockImplementation((filePath) => {
    if (filePath != path.resolve(dataPath)) throw Error("Invalid path");

    return Promise.resolve(data);
  });
};

it("loads the dataset into the store via fs-extra", async () => {
  mockReadJson({ hamsters: { data: "test" } });

  await loadCollection("hamsters");

  expect(data).toHaveProperty("hamsters", { data: "test" });
});

it("marks the collection as loaded", async () => {
  mockReadJson({ hamsters: {} });
  await loadCollection("hamsters");
  expect(hasLoadedCollection("hamsters")).toBe(true);
});

describe("when returning multiple keys in dataset", () => {
  it("loads both keys into the store", async () => {
    mockReadJson({
      hamsters: { data: "test" },
      chinchillas: { myEncoding: [1, 2, 3] },
    });

    await loadCollection("hamsters");

    expect(data).toHaveProperty("hamsters", { data: "test" });
    expect(data).toHaveProperty("chinchillas", { myEncoding: [1, 2, 3] });
  });
});

describe("when loading collection repeatedly", () => {
  it("only loads data once", async () => {
    mockReadJson({ hamsters: {} });
    await loadCollection("hamsters");
    expect(readJson).toHaveBeenCalledTimes(1);

    // Additional calls of the function does not re-trigger loading
    await loadCollection("hamsters");
    expect(readJson).toHaveBeenCalledTimes(1);
  });
});

describe("when several collections share a file", () => {
  beforeEach(() => {
    ({ loadCollection, hasLoadedCollection, data } = createStore({
      collections: [
        { name: "hamsters", file: "chinchillas" },
        { name: "chinchillas" },
      ],
    }));
  });

  it("loads both collections", async () => {
    mockReadJson(
      {
        hamsters: { data: "hamsters" },
        chinchillas: { data: "chinchillas" },
      },
      "public/data/chinchillas.min.json"
    );

    await loadCollection("hamsters");

    expect(data).toHaveProperty("hamsters", { data: "hamsters" });
    expect(hasLoadedCollection("hamsters")).toBe(true);
    expect(data).toHaveProperty("chinchillas", { data: "chinchillas" });
    expect(hasLoadedCollection("chinchillas")).toBe(true);
  });
});
