/**
 * @jest-environment node
 */

import path from "path";
import { ensureDirSync, writeJsonSync } from "fs-extra";
import createStore from "@sdgindex/store";

jest.mock("fs-extra");

let writeCollection, addRecord;

beforeEach(() => {
  ({ writeCollection, addRecord } = createStore({
    collections: [{ name: "frogs" }],
  }));
});

it("ensures the target directory exists", () => {
  writeCollection("frogs");
  expect(ensureDirSync).toHaveBeenCalledWith(path.resolve("./public/data"));
});

it("writes the collection's data to filesystem", () => {
  const frogs = {
    1: { id: 1, color: "green" },
    5: { id: 5, color: "red" },
  };
  Object.values(frogs).forEach((frog) => addRecord("frogs", frog));

  writeCollection("frogs");

  expect(writeJsonSync).toHaveBeenCalledWith(
    path.resolve("./public/data", "frogs.min.json"),
    { frogs }
  );
  expect(writeJsonSync).toHaveBeenCalledWith(
    path.resolve("./public/data", "frogs.json"),
    { frogs },
    { spaces: 2 }
  );
});

describe("when several collections share a file", () => {
  beforeEach(() => {
    ({ writeCollection, addRecord } = createStore({
      collections: [
        { name: "frogs", file: "main" },
        { name: "cows", file: "main" },
      ],
    }));
  });

  it("writes both collections", () => {
    const frogs = {
      1: { id: 1, color: "green" },
      5: { id: 5, color: "red" },
    };
    const cows = {
      betty: { id: "betty", age: 12 },
    };
    Object.values(frogs).forEach((frog) => addRecord("frogs", frog));
    Object.values(cows).forEach((frog) => addRecord("cows", frog));

    writeCollection("frogs");

    expect(writeJsonSync).toHaveBeenCalledWith(
      path.resolve("./public/data", "main.min.json"),
      { frogs, cows }
    );
    expect(writeJsonSync).toHaveBeenCalledWith(
      path.resolve("./public/data", "main.json"),
      { frogs, cows },
      { spaces: 2 }
    );
  });
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => writeCollection("centipedes")).toThrowError(
      "Collection with name centipedes does not exist."
    );
  });
});
