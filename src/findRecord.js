import cloneDeep from "lodash.cloneDeep";

export function findRecord(collection, id) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  // Return record in the collection
  return cloneDeep(this.data[collection][id]);
}
