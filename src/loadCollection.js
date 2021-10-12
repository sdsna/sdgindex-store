export function loadCollection(collection) {
  // If collection has loaded, return existing data
  if (this.hasLoadedCollection(collection))
    return Promise.resolve(this.getCollection(collection));

  // If collection is loading, return promise
  if (this.isLoadingCollection(collection))
    return this.collections[collection].promise;

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
    Object.assign(this.data[collection], data);

    // Mark collection as loaded and remove promise
    this.collections[collection].loaded = true;
    this.collections[collection].promise = null;

    return data;
  });

  // Store promise for re-use when trying to load collection again
  this.collections[collection].promise = promise;

  return promise;
}
