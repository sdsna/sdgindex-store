import urlJoin from "url-join";

export function getCollectionWebPath(collection) {
  return urlJoin("/data", `${this.getCollection(collection).file}.min.json`);
}
