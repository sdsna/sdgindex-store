import bindMethods from "./bindMethods";
import { addCollection } from "./addCollection";
import { getCollection } from "./getCollection";
import { hasCollection } from "./hasCollection";
import { hasLoadedCollection } from "./hasLoadedCollection";
import { isLoadingCollection } from "./isLoadingCollection";
import { loadCollection } from "./loadCollection";
import { loadCollections } from "./loadCollections";
import { writeCollection } from "./writeCollection";
import { writeCollections } from "./writeCollections";
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
    loadCollections,
    writeCollection,
    writeCollections,
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
