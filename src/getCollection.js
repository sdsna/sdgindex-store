import cloneDeep from "lodash.clonedeep";

export function getCollection(collection) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  // Return records in the collection
  return cloneDeep(Object.values(this.data[collection]));
}
