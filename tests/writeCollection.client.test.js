/**
 * @jest-environment jsdom
 */

import createStore from "@sdgindex/store";

let writeCollection;

beforeEach(() => {
  ({ writeCollection } = createStore({
    collections: [{ name: "frogs" }],
  }));
});

it("throws an error", async () => {
  expect(() => writeCollection("frogs")).toThrowError(
    "writeCollection was invoked on client, but writing can only be done server-side."
  );
});
