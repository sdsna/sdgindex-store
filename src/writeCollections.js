export function writeCollections(collections = "all") {
  // Load all collections
  if (collections === "all") collections = Object.keys(this.collections);

  // Write all collections
  collections.map((c) => this.writeCollection(c));
}
