import omit from "lodash.omit";
import bindMethods from "./bindMethods";
import { addCollection } from "./addCollection";
import { getCollection } from "./getCollection";
import { hasCollection } from "./hasCollection";
import { hasLoadedCollection } from "./hasLoadedCollection";
import { isLoadingCollection } from "./isLoadingCollection";
import { loadCollection } from "./loadCollection";
import { writeCollection } from "./writeCollection";
import { addRecord } from "./addRecord";
import { hasRecord } from "./hasRecord";
import { findRecord } from "./findRecord";
import { issueId } from "./issueId";

const createStore = ({ collections = [] } = {}) => {
  // Create empty store
  const store = {
    data: {},
    collections: {},
    promises: {},
    addCollection,
    getCollection,
    hasCollection,
    hasLoadedCollection,
    isLoadingCollection,
    loadCollection,
    writeCollection,
    addRecord,
    hasRecord,
    findRecord,
    issueId,
  };

  // Bind all methods so that `this` refers to the store
  bindMethods(store);

  // Set up collections
  collections.forEach(store.addCollection);

  return omit(store, "issueId", "promises");
};

export { createStore };
