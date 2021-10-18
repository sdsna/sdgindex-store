export function issueId(collection) {
  // Get next ID
  const { nextId: id } = this.getCollection(collection);

  // Increment next ID to be issued
  this.getCollection(collection).nextId = id + 1;

  // If record with ID does not yet exist, return ID
  if (!this.hasRecord(collection, id)) return id;

  // Otherwise issue next ID
  return this.issueId(collection);
}
