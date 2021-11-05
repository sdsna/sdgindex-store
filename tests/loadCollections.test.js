import createStore from "@sdgindex/store";

let loadCollections;

const mockLoadCollection = jest.fn();

beforeEach(() => {
  const store = createStore({
    collections: [
      { name: "penguins" },
      { name: "flamingoes" },
      { name: "owls", alwaysLoad: true },
      { name: "swans", alwaysLoad: true },
    ],
  });

  store.loadCollection = mockLoadCollection;
  ({ loadCollections } = store);
});

it("runs loadCollection for all collections marked as alwaysLoad", () => {
  loadCollections();

  expect(mockLoadCollection).toHaveBeenCalledWith("owls");
  expect(mockLoadCollection).toHaveBeenCalledWith("swans");
  expect(mockLoadCollection).toHaveBeenCalledTimes(2);
});

describe("with argument 'all'", () => {
  it("runs loadCollection for every collection", () => {
    loadCollections("all");

    expect(mockLoadCollection).toHaveBeenCalledWith("penguins");
    expect(mockLoadCollection).toHaveBeenCalledWith("flamingoes");
    expect(mockLoadCollection).toHaveBeenCalledWith("owls");
    expect(mockLoadCollection).toHaveBeenCalledWith("swans");
    expect(mockLoadCollection).toHaveBeenCalledTimes(4);
  });
});

describe("with array of collections", () => {
  it("loads each collection plus collections marked as alwaysLoad", () => {
    loadCollections(["penguins", "owls"]);

    expect(mockLoadCollection).toHaveBeenCalledWith("penguins");
    expect(mockLoadCollection).toHaveBeenCalledWith("owls");
    expect(mockLoadCollection).toHaveBeenCalledWith("swans");
    expect(mockLoadCollection).not.toHaveBeenCalledWith("flamingoes");
    expect(mockLoadCollection).toHaveBeenCalledTimes(3);
  });
});
