export function hasCollection(collection) {
  return this.collections.some((c) => c.name === collection);
}
