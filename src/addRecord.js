import cloneDeep from "lodash.clonedeep";

export function addRecord(collection, record) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  // Verify that collection has an ID
  const id = record.id;
  if (id == null)
    throw new Error("Every record needs to be assigned a unique ID.");

  // Verify that ID is unique
  if (this.findRecord(collection, id))
    throw new Error(`Record with ID ${id} already exists in ${collection}.`);

  // Add the record to the store
  // We make a deep-clone of the record, so that further modifications to the
  // original record do not affect the record in our store
  this.data[collection][id] = cloneDeep(record);
}
