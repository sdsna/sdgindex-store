import pickBy from "lodash.pickby";

export function loadCollection(collection) {
  // If collection has loaded, return existing data
  if (this.hasLoadedCollection(collection))
    return Promise.resolve(this.getRecords(collection));

  // If collection is loading, return promise
  if (this.isLoadingCollection(collection))
    return this.getCollection(collection).promise;

  let promise = null;

  // Load data via readJson (server) or fetch (browser), depending on environment
  if (typeof window === "undefined" || typeof fetch === "undefined") {
    // Server
    const fse = require("fs-extra");
    promise = fse.readJson(this.getCollectionFilePath(collection));
  } else {
    // Browser
    promise = fetch(this.getCollectionWebPath(collection)).then((res) =>
      res.json()
    );
  }

  // When loading is done, replace promise with actual data
  promise.then((data) => {
    Object.assign(this.data, data);
    return data;
  });

  // Get all collections contained in this collection's file
  const collections = pickBy(
    this.collections,
    ({ file }) => file === this.getCollection(collection).file
  );

  // Store promise for re-use when trying to load collection again for all
  // collections that share this collection's file name
  Object.entries(collections).map(([collectionName, collectionObject]) => {
    collectionObject.promise = promise.then((data) => {
      // Mark collection as loaded and remove promise
      collectionObject.loaded = true;
      collectionObject.promise = null;

      return data[collectionName];
    });
  });

  return this.getCollection(collection).promise;
}
