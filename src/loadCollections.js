import uniq from "lodash.uniq";

export function loadCollections(collections = []) {
  // Load all collections
  if (collections === "all") collections = Object.keys(this.collections);

  // Always load collections marked as alwaysLoad
  const collectionsToAlwaysLoad = Object.keys(this.collections).filter(
    (key) => this.collections[key].alwaysLoad
  );
  collections = uniq([...collections, ...collectionsToAlwaysLoad]);

  // Return a promise that resolves when all collections have been loaded
  return Promise.all(collections.map((c) => this.loadCollection(c)));
}
