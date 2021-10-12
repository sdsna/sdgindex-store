export function hasLoadedCollection(collection) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  return this.collections[collection].loaded === true;
}
