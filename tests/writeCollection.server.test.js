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
  expect(ensureDirSync).toHaveBeenCalledWith("./public/data");
});

it("writes the collection's data to filesystem", () => {
  const frogs = {
    1: { id: 1, color: "green" },
    5: { id: 5, color: "red" },
  };
  Object.values(frogs).forEach((frog) => addRecord("frogs", frog));

  writeCollection("frogs");

  expect(writeJsonSync).toHaveBeenCalledWith(
    path.join("./public/data", "frogs.json"),
    frogs
  );
  expect(writeJsonSync).toHaveBeenCalledWith(
    path.join("./public/data", "frogs-raw.json"),
    frogs,
    { spaces: 2 }
  );
});

describe("when collection does not exist", () => {
  it("throws an error", () => {
    expect(() => writeCollection("centipedes")).toThrowError(
      "Collection with name centipedes does not exist."
    );
  });
});
