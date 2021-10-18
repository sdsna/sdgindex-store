import createStore from "@sdgindex/store";

let writeCollections;

const mockWriteCollection = jest.fn();

beforeEach(() => {
  const store = createStore({
    collections: [{ name: "crabs" }, { name: "clams" }, { name: "jellyfish" }],
  });

  store.writeCollection = mockWriteCollection;
  ({ writeCollections } = store);
});

it("calls writeCollection for every collection", () => {
  writeCollections();

  expect(mockWriteCollection).toHaveBeenCalledWith("crabs");
  expect(mockWriteCollection).toHaveBeenCalledWith("clams");
  expect(mockWriteCollection).toHaveBeenCalledWith("jellyfish");
  expect(mockWriteCollection).toHaveBeenCalledTimes(3);
});

describe("with argument 'all'", () => {
  it("calls writeCollection for every collection", () => {
    writeCollections("all");

    expect(mockWriteCollection).toHaveBeenCalledWith("crabs");
    expect(mockWriteCollection).toHaveBeenCalledWith("clams");
    expect(mockWriteCollection).toHaveBeenCalledWith("jellyfish");
    expect(mockWriteCollection).toHaveBeenCalledTimes(3);
  });
});

describe("with array of collections", () => {
  it("calls writeCollection for each element in the array", () => {
    writeCollections(["crabs", "jellyfish"]);

    expect(mockWriteCollection).toHaveBeenCalledWith("crabs");
    expect(mockWriteCollection).toHaveBeenCalledWith("jellyfish");
    expect(mockWriteCollection).not.toHaveBeenCalledWith("clams");
    expect(mockWriteCollection).toHaveBeenCalledTimes(2);
  });
});
