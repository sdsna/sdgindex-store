import omit from "lodash.omit";
import bindMethods from "./bindMethods";
import { addCollection } from "./addCollection";
import { hasCollection } from "./hasCollection";
import { getCollection } from "./getCollection";
import { addRecord } from "./addRecord";
import { hasRecord } from "./hasRecord";
import { findRecord } from "./findRecord";
import { issueId } from "./issueId";

const createStore = ({ collections = [] } = {}) => {
  // Create empty store
  const store = {
    data: {},
    collections: {},
    addCollection,
    hasCollection,
    getCollection,
    addRecord,
    hasRecord,
    findRecord,
    issueId,
  };

  // Bind all methods so that `this` refers to the store
  bindMethods(store);

  // Set up collections
  collections.forEach(store.addCollection);

  return omit(store, "issueId");
};

export { createStore };
