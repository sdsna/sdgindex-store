import createStore from "@sdgindex/store";

let addCollection,
  hasCollection,
  data,
  collections,
  getCollectionWebPath,
  getCollectionFilePath;

beforeEach(() => {
  ({
    addCollection,
    hasCollection,
    data,
    collections,
    getCollectionFilePath,
    getCollectionWebPath,
  } = createStore());
});

it("can add a collection", () => {
  addCollection({ name: "birds" });

  expect(hasCollection("birds")).toBe(true);
});

it("can add a collection with hyphens and underscores", () => {
  addCollection({ name: "the-biggest_1000_BIRDS" });

  expect(hasCollection("the-biggest_1000_BIRDS")).toBe(true);
});

it("sets data for collection to empty object", () => {
  addCollection({ name: "birds" });

  expect(data["birds"]).toEqual({});
});

it("can add a collection marked as alwaysLoad", () => {
  addCollection({ name: "birds", alwaysLoad: true });

  expect(collections["birds"]).toHaveProperty("alwaysLoad", true);
});

describe("when passing invalid collection parameters", () => {
  it("throws an error", () => {
    expect(() => addCollection({ name: "birds", size: "large" })).toThrowError(
      "Invalid parameters supplied for new collection: size = large"
    );
  });
});

describe("when passing invalid name", () => {
  it("throws an error without name", () => {
    expect(() => addCollection({})).toThrowError(
      "Collection name undefined is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
    );
  });
  it("throws an error with name null", () => {
    expect(() => addCollection({ name: null })).toThrowError(
      "Collection name null is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
    );
  });

  it("throws an error when name contains spaces", () => {
    expect(() => addCollection({ name: "my collection" })).toThrowError(
      "Collection name my collection is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
    );
  });

  it("throws an error with name !nv$l(d-ch@r@ct{rs", () => {
    expect(() => addCollection({ name: "!nv$l(d-ch@r@ct{rs" })).toThrowError(
      "Collection name !nv$l(d-ch@r@ct{rs is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
    );
  });
});

describe("when a collection with the name already exists", () => {
  it("throws an error", () => {
    addCollection({ name: "birds" });

    expect(() => addCollection({ name: "birds" })).toThrowError(
      "Collection with name birds already exists."
    );
  });
});

describe("when passing a custom file name", () => {
  it("adjusts the filePath and webPath", () => {
    addCollection({ name: "birds", file: "dinosaurs" });

    expect(getCollectionFilePath("birds")).toMatch(/dinosaurs\.min\.json$/);
    expect(getCollectionWebPath("birds")).toMatch(/dinosaurs\.min\.json$/);
  });

  describe("when passing invalid file name", () => {
    it("throws an error when name contains spaces", () => {
      expect(() =>
        addCollection({ name: "birds", file: "my file" })
      ).toThrowError(
        "Collection file name my file is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
      );
    });

    it("throws an error with name !nv$l(d-ch@r@ct{rs", () => {
      expect(() =>
        addCollection({ name: "birds", file: "!nv$l(d-ch@r@ct{rs" })
      ).toThrowError(
        "Collection file name !nv$l(d-ch@r@ct{rs is invalid. Only a-z, A-Z, 0-9, _, and - are allowed."
      );
    });
  });
});
