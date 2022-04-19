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
  const objStore = tx.objectStore("jate");
  // uses put to update the database
  const req = objStore.put({ id: id, value: value });
  const res = await req;
  // console log to confirm the update
  console.log("data updated successfully", res);
};
// GET all function
export const getDb = async () => {
  // connects to the jate DB and the version we are using
  const jateDb = await openDB("jate", 1);
  // makes new transaction and specify the data used
  const tx = jateDb.transaction("jate", "readwrite");
  // creates the obj store
  const objStore = tx.objectStore("jate");
  // use get to fetch data from DB
  const req = objStore.getAll();
  const res = await req;
  // console log to confirm data was fetched
  console.log("data retrieved successfully", res);
  return res;
};
initdb();
