import cloneDeep from "lodash.clonedeep";

export function addRecord(collection, record) {
  // Verify that the collection exists
  if (!this.hasCollection(collection))
    throw new Error(`Collection with name ${collection} does not exist.`);

  // If record has no ID set, automatically issue an ID
  if (record.id == null) record.id = this.issueId(collection);

  // Verify that ID is unique
  if (this.hasRecord(collection, record.id))
    throw new Error(
      `Record with ID ${record.id} already exists in ${collection}.`
    );

  // Add the record to the store
  // We make a deep-clone of the record, so that further modifications to the
  // original record do not affect the record in our store
  this.data[collection][record.id] = cloneDeep(record);
}
