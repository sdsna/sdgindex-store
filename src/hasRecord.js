export function hasRecord(collection, id) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  return Object.prototype.hasOwnProperty.call(this.data[collection], id);
}
