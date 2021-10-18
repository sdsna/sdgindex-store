# @sdgindex/store

A store solution for Next.js (or React.js) using static JSON files.

- [@sdgindex/store](#sdgindexstore)
  - [Installation](#installation)
  - [How to use](#how-to-use)
    - [1. Creating a data store](#1-creating-a-data-store)
    - [2. Adding records and writing your collections](#2-adding-records-and-writing-your-collections)
    - [3. Loading your collections and retrieving records](#3-loading-your-collections-and-retrieving-records)
  - [Collections](#collections)
    - [Writing Data](#writing-data)
    - [Loading Data](#loading-data)
  - [Records](#records)
  - [Background](#background)

## Installation

```terminal
npm install @sdgindex/store
```

## How to use

There are three steps to using `@sdgindex/store`:

1. Creating a data store
2. Adding records and writing your collections
3. Loading your collections and retrieving records

### 1. Creating a data store

Create a data store in `stores/dataStore.js`:

```javascript
// stores/dataStore.js
const createStore = require("@sdgindex/store");

// Define two collections
const collections = [{ name: "countries" }, { name: "indicators" }];

// Create the store with the two collections and destructure the functions
// for interacting with our new store
const { getCollection, findRecord, addRecord } = createStore({ collections });

module.exports = {
  getCollection,
  findRecord,
  addRecord,
};
```

### 2. Adding records and writing your collections

Then you can set up your data store, for example using `data/setup.js`:

```javascript
// data/setup.js
const { addRecord, writeCollections } = require("stores/dataStore");

// Add various records. For example, a country.
addRecord("countries", { id: "FRA", name: "France" });

// Write collection
writeCollection("countries");
```

Your collections will be written to `public/data`.

### 3. Loading your collections and retrieving records

Then you can use your data store in your files, for example `pages/MyPage.js`:

```javascript
// pages/MyPage.js
import { findRecord, loadCollection } from "stores/dataStore";

const MyPage = ({ country }) => <p>Hello {country.name}!</p>;

MyPage.getInitialProps = async () => {
  // Load the countries collection
  await loadCollection("countries");

  // Retrieve the record with ID "FRA"
  const country = findRecord("countries", "FRA");

  return { country };
};
```

## Collections

`@sdgindex/store` stores data records in collections.

Collections can be defined when creating the store by passing a `collections`
argument to `createStore`:

```javascript
const collections = [{ name: "countries" }, { name: "indicators" }];

const store = createStore({ collections });
```

Collections can also be defined after the store is created using the
`addCollection` function. It takes the same arguments as the `collections`
argument of `createStore`:

```javascript
const collections = [{ name: "countries" }, { name: "indicators" }];

const { addCollection } = createStore({ collections });

addCollection({ name: "cities", file: "countries" });
```

Under the hood, each collection is a JSON object. The keys are the IDs of
the records in the collection and the values are the corresponding records.

For example, a `countries` collection with two records (for France and Germany)
might look like the example below. `FRA` and `DEU` are the respective record
IDs.

```json
{
  "countries": {
    "FRA": {
      "name": "France",
      "population": 67.39
    },
    "DEU": {
      "name": "Germany",
      "population": 83.24
    }
  }
}
```

### Writing Data

To write data to JSON files, use the `writeCollection` method. This creates
two `.json` files per collection: One minified (`.json`) and one with spaces
and newlines for human reading and diffing (`-raw.json`).

```javascript
const { addRecord, writeCollection } = createStore({
  collections: [{ name: "countries" }],
});

// Add some records, see section "Records" below
// addRecord("countries", ...)
// ...

// Write the collection to JSON
writeCollection("countries");
```

By default, collections are written to the `public/data` directory.

By default, each collection is written to a separate JSON file, so that
collections can be loaded independently from one another. It is also possible
to write several collections to the same file (or even to write a collection to
a file with a different name), by specifying the `file` argument on the
`collections`:

```javascript
const collections = [
  { name: "countries", file: "my-custom-file" },
  { name: "indicators", file: "my-custom-file" },
];

const store = createStore({ collections });
```

When calling `writeCollection("countries")` (or
`writeCollection("indicators")`), the data from both collections will be
written to `my-custom-file.json`. This feature can be useful when dealing with
very small collections as we may want to avoid making too many HTTP requests.

### Loading Data

In your application, before records can be retrieved from your collections, the
collection must be loaded into the store. For this, you will use the
`loadCollection` function:

```javascript
// stores/dataStore
const { loadCollection, findRecord, getCollection } = createStore({
  collections: [{ name: "countries" }],
});

module.exports = { loadCollection, findRecord, getCollection };
```

```javascript
// pages/MyPage.js
import { loadCollection, findRecord, getCollection } from "stores/dataStore";

const MyPage = (country) => <p>{country.name}</p>;

MyPage.getInitialProps = async () => {
  // Load the collection into the store. If the collection has already been
  // loaded, it is NOT requested again and the promise resolves right away.
  await loadCollection("countries");

  // From here on, we can use findRecord or getCollection
  const country = findRecord("countries", 1);
  const countries = getCollection("countries");

  return { country };
};

export default MyPage;
```

## Records

Every collection contains records. For example, a `countries` collection might
contain several `country` records, where each record has a `name`, `isoCode`,
`population`, `size`, and so on.

You can add records to a collection using the `addRecord` method. Records are
automatically assigned a primary ID (starting at 1, just like in SQL). To set a
custom ID, the record must simply have an `id` property.

```javascript
const { addRecord } = createStore({ collections: [{ name: "countries" }] });

// Add a country to the collection
addRecord("countries", { name: "France", isoCode: "FRA" });

// Add a country to the collection with ID "DE"
addRecord("countries", { name: "Germany", isoCode: "DEU", id: "DE" });
```

You can get all records from a collection by using the `getRecords` method or
find a single record in a collection using `findRecord`:

```javascript
const { getRecords, findRecord } = createStore({
  collections: [{ name: "countries" }],
});

// Array of JSON objects (all records in the collection)
// [{ name: "France", ... }, { name: "Germany", ... }]
const countries = getRecords("countries");

// Single JSON object
// { name: "France", isoCode: "FRA", id: 1 }
const france = findRecord("countries", 1);
// { name: "Germany", isoCode: "DEU", id: "DE" }
const germany = findRecord("countries", "DE");
```

## Background

For our SDG Indices, we are dealing exclusively with static data. Static data
meets the following criteria:

1. The data that is available at compile-time
2. The data does not need to be modified or updated at run-time

Next.js introduced `getStaticProps` for pages that exclusively use static data.
This approach creates one JSON file per page using `getStaticProps`, which is
loaded when the page is visited.

For applications like our SDG Index, where the data used by different pages is
largely the same, this creates a lot of repetition. It is more efficient to load
the required data once for the entire app rather than repeatedly loading it
individually for each page.

`@sdgindex/store` offers exactly this: Efficiently writing and loading static
data at the application level.
