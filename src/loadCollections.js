export function loadCollections(collections = "all") {
  // Load all collections
  if (collections === "all") collections = Object.keys(this.collections);

  // Return a promise that resolves when all collections have been loaded
  return Promise.all(collections.map((c) => this.loadCollection(c)));
}
