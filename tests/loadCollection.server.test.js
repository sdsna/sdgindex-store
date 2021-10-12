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
const mockReadJson = (data) => {
  readJson.mockImplementation((filePath) => {
    if (filePath != path.resolve("public/data/hamsters.json"))
      throw Error("Invalid path");

    return Promise.resolve(data);
  });
};

it("loads the dataset into the store via fs-extra", async () => {
  mockReadJson({ data: "test" });

  await loadCollection("hamsters");

  expect(data).toHaveProperty("hamsters", { data: "test" });
});

it("marks the collection as loaded", async () => {
  mockReadJson();
  await loadCollection("hamsters");
  expect(hasLoadedCollection("hamsters")).toBe(true);
});

describe("when returning multiple keys in dataset", () => {
  it("loads both keys into the store", async () => {
    mockReadJson({
      data: "test",
      myEncoding: [1, 2, 3],
    });

    await loadCollection("hamsters");

    expect(data).toHaveProperty("hamsters", {
      data: "test",
      myEncoding: [1, 2, 3],
    });
  });
});

describe("when loading collection repeatedly", () => {
  it("only loads data once", async () => {
    mockReadJson();
    await loadCollection("hamsters");
    expect(readJson).toHaveBeenCalledTimes(1);

    // Additional calls of the function does not re-trigger loading
    await loadCollection("hamsters");
    expect(readJson).toHaveBeenCalledTimes(1);
  });
});
