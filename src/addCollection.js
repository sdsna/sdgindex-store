import isEmpty from "lodash.isempty";

const namePattern = /^[a-z0-9_-]+$/i;

export function addCollection({ name, file, ...otherParams }) {
  // Verify that no unpermitted params have been supplied
  if (!isEmpty(otherParams))
    throw new Error(
      "Invalid parameters supplied for new collection: " +
        Object.entries(otherParams)
          .map(([key, value]) => `${key} = ${value}`)
          .join(",")
    );

  // Default the filename to collection name
  if (file == null) file = name;

  // Ensure that collection name consists of valid characters
  if (!name || !namePattern.test(name))
    throw new Error(
      `Collection name ${name} is invalid. Only a-z, A-Z, 0-9, _, and - are allowed.`
    );

  // Ensure that file name consists of valid characters
  if (!namePattern.test(file))
    throw new Error(
      `Collection file name ${file} is invalid. Only a-z, A-Z, 0-9, _, and - are allowed.`
    );

  // Ensure that collection with this name does not yet exist
  if (this.hasCollection(name))
    throw new Error(`Collection with name ${name} already exists.`);

  // Add collection
  this.collections[name] = { nextId: 1, file };
  this.data[name] = {};
}
