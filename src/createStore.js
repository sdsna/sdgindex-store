import bindMethods from "./bindMethods";
import { addCollection } from "./addCollection";
import { getCollection } from "./getCollection";
import { hasCollection } from "./hasCollection";
import { hasLoadedCollection } from "./hasLoadedCollection";
import { isLoadingCollection } from "./isLoadingCollection";
import { loadCollection } from "./loadCollection";
import { writeCollection } from "./writeCollection";
import { getCollectionFilePath } from "./getCollectionFilePath";
import { getCollectionWebPath } from "./getCollectionWebPath";
import { addRecord } from "./addRecord";
import { getRecords } from "./getRecords";
import { hasRecord } from "./hasRecord";
import { findRecord } from "./findRecord";
import { issueId } from "./issueId";

const createStore = ({ collections = [] } = {}) => {
  // Create empty store
  const store = {
    data: {},
    collections: {},
    addCollection,
    getCollection,
    hasCollection,
    hasLoadedCollection,
    isLoadingCollection,
    loadCollection,
    writeCollection,
    getCollectionFilePath,
    getCollectionWebPath,
    addRecord,
    getRecords,
    hasRecord,
    findRecord,
    issueId,
  };

  // Bind all methods so that `this` refers to the store
  bindMethods(store);

  // Set up collections
  collections.forEach(store.addCollection);

  return store;
};

export { createStore };
