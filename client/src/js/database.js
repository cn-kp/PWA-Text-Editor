import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// PUT function
export const putDb = async (content) => {
  // connects to the jate DB and the version we are using
  const jateDb = await openDB("jate", 1);
  // makes new transaction and specify the data used
  const tx = jateDb.transaction("jate", "readwrite");
  // creates the obj store
  const store = tx.objectStore("jate");
  // uses put to update the database
  const request = store.put({ id:1, value: content });
  const result = await request;
  // console log to confirm the update
  console.log("data updated successfully", result.value);
};
// GET all function
export const getDb = async () => {
  // connects to the jate DB and the version we are using
  const jateDb = await openDB("jate", 1);
  // makes new transaction and specify the data used
  const tx = jateDb.transaction("jate", "readonly");
  // creates the obj store
  const store = tx.objectStore("jate");
  // use get to fetch data from DB
  const request = store.get(1);
  const result = await request;
  // console log to confirm data was fetched
  result
  ?
  console.log("data retrieved successfully", result.value)
  :console.log("nod data");
  return result?.value;
};
initdb();
