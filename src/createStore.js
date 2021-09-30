import bindMethods from "./bindMethods";
import { addCollection } from "./addCollection";
import { hasCollection } from "./hasCollection";
import { getCollection } from "./getCollection";
import { addRecord } from "./addRecord";
import { findRecord } from "./findRecord";

const createStore = ({ collections = [] } = {}) => {
  // Create empty store
  const store = {
    data: {},
    collections: [],
    addCollection,
    hasCollection,
    getCollection,
    addRecord,
    findRecord,
  };

  // Bind all methods so that `this` refers to the store
  bindMethods(store);

  // Set up collections
  collections.forEach(store.addCollection);

  return store;
};

export { createStore };
