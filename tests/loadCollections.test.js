import createStore from "@sdgindex/store";

let loadCollections;

const mockLoadCollection = jest.fn();

beforeEach(() => {
  const store = createStore({
    collections: [
      { name: "penguins" },
      { name: "flamingoes" },
      { name: "owls" },
    ],
  });

  store.loadCollection = mockLoadCollection;
  ({ loadCollections } = store);
});

it("runs loadCollection for every collection", () => {
  loadCollections();

  expect(mockLoadCollection).toHaveBeenCalledWith("penguins");
  expect(mockLoadCollection).toHaveBeenCalledWith("flamingoes");
  expect(mockLoadCollection).toHaveBeenCalledWith("owls");
  expect(mockLoadCollection).toHaveBeenCalledTimes(3);
});

describe("with argument 'all'", () => {
  it("runs loadCollection for every collection", () => {
    loadCollections("all");

    expect(mockLoadCollection).toHaveBeenCalledWith("penguins");
    expect(mockLoadCollection).toHaveBeenCalledWith("flamingoes");
    expect(mockLoadCollection).toHaveBeenCalledWith("owls");
    expect(mockLoadCollection).toHaveBeenCalledTimes(3);
  });
});

describe("with array of collections", () => {
  it("runs loadCollection for each element in the array", () => {
    loadCollections(["penguins", "owls"]);

    expect(mockLoadCollection).toHaveBeenCalledWith("penguins");
    expect(mockLoadCollection).toHaveBeenCalledWith("owls");
    expect(mockLoadCollection).not.toHaveBeenCalledWith("flamingoes");
    expect(mockLoadCollection).toHaveBeenCalledTimes(2);
  });
});
