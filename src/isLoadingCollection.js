export function isLoadingCollection(collection) {
  return this.getCollection(collection).promise != null;
}
