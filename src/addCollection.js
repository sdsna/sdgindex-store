import isEmpty from "lodash.isempty";

const namePattern = /^[a-z0-9_-]+$/i;

export function addCollection({ name, ...otherParams }) {
  // Verify that no unpermitted params have been supplied
  if (!isEmpty(otherParams))
    throw new Error(
      "Invalid parameters supplied for new collection: " +
        Object.entries(otherParams)
          .map(([key, value]) => `${key} = ${value}`)
          .join(",")
    );

  // Ensure that collection name consists of valid characters
  if (!name || !namePattern.test(name))
    throw new Error(
      `Collection name ${name} is invalid. Only a-z, A-Z, 0-9, _, and - are allowed.`
    );

  // Ensure that collection with this name does not yet exist
  if (this.hasCollection(name))
    throw new Error(`Collection with name ${name} already exists.`);

  // Add collection
  this.collections[name] = { nextId: 1 };
  this.data[name] = {};
}
