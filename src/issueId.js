export function issueId(collection) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  // Get next ID
  const { nextId: id } = this.collections[collection];

  // Increment next ID to be issued
  this.collections[collection].nextId = id + 1;

  // If record with ID does not yet exist, return ID
  if (!this.hasRecord(collection, id)) return id;

  // Otherwise issue next ID
  return this.issueId(collection);
}
