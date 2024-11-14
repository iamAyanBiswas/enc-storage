// Open DB function to open the database with autoIncrement option
 const openDB = (dbName: string, version: number): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        reject(`Error opening database: ${(event.target as IDBRequest).error}`);
      };
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result;
        // Create an object store with autoIncrement option
        if (!db.objectStoreNames.contains('dataStore')) {
          db.createObjectStore('dataStore', { autoIncrement: true });
        }
      };
    });
  };
  
  // Get data by key
   const getData = (dbName: string, key: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB(dbName, 1);
        const transaction = db.transaction('dataStore', 'readonly');
        const objectStore = transaction.objectStore('dataStore');
        const request = objectStore.get(key);
  
        request.onsuccess = () => {
          resolve(request.result);
        };
  
        request.onerror = () => {
          reject(`Error getting data for key ${key}`);
        };
      } catch (error) {
        reject(`Error opening database: ${error}`);
      }
    });
  };
  
  // Add data with autoIncrement enabled
   const addData = (dbName: string, key:string, value: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB(dbName, 1);
        const transaction = db.transaction('dataStore', 'readwrite');
        const objectStore = transaction.objectStore('dataStore');
  
        const request = objectStore.add(value,key); // No need to specify the key, autoIncrement will handle it
  
        request.onsuccess = () => {
          resolve(); 
        };
  
        request.onerror = () => {
          reject('Error adding data. The key may already exist or another issue occurred.');
        };
      } catch (error) {
        reject(`Error opening database: ${error}`);
      }
    });
  };
  
  // Update data by key
   const updateData = (dbName: string, key: string, value: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB(dbName, 1);
        const transaction = db.transaction('dataStore', 'readwrite');
        const objectStore = transaction.objectStore('dataStore');
  
        // First, check if the key exists
        const request = objectStore.get(key);
  
        request.onsuccess = () => {
          if (request.result === undefined) {
            reject(`Key "${key}" does not exist in the database.`);
            return;
          }
  
          // Proceed to update the record
          const updateRequest = objectStore.put(value, key); // We pass the value and key to update
  
          updateRequest.onsuccess = () => {
            resolve();
          };
  
          updateRequest.onerror = () => {
            reject(`Error updating data for key "${key}"`);
          };
        };
  
        request.onerror = () => {
          reject(`Error checking key "${key}" in the database`);
        };
      } catch (error) {
        reject(`Error opening database: ${error}`);
      }
    });
  };
  
  // Delete data by key
   const deleteData = (dbName: string, key: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await openDB(dbName, 1);
        const transaction = db.transaction('dataStore', 'readwrite');
        const objectStore = transaction.objectStore('dataStore');
        const request = objectStore.delete(key);
  
        request.onsuccess = () => {
          resolve();
        };
  
        request.onerror = () => {
          reject(`Error deleting data for key "${key}"`);
        };
      } catch (error) {
        reject(`Error opening database: ${error}`);
      }
    });
  };
  
  // Delete the entire database
   const deleteDB = (dbName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(dbName);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(`Error deleting database: ${(event.target as IDBRequest).error}`);
      };
    });
  };
  

export {openDB, addData, updateData, getData, deleteData, deleteDB}




















// interface DatabaseOptions {
//     dbName: string;
//     version: number;
//   }
  
//   // Function to open a database
//   async function openDB(options: DatabaseOptions): Promise<IDBDatabase> {
//     const request = indexedDB.open(options.dbName, options.version);
  
//     return new Promise((resolve, reject) => {
//       request.onerror = (event: Event) => {
//         reject(`Error opening database: ${event}`);
//       };
  
//       request.onsuccess = (event: Event) => {
//         const db = (event.target as IDBRequest).result as IDBDatabase;
//         resolve(db);
//       };
  
//       request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
//         const db = (event.target as IDBRequest).result as IDBDatabase;
//         if (!db.objectStoreNames.contains("dataStore")) {
//           db.createObjectStore("dataStore", { autoIncrement: true });
//         }
//       };
//     });
//   }
  
//   // Function to add a new key-value pair to the database
//   async function addData(db: IDBDatabase, key: string, value: any): Promise<void> {
//     const transaction = db.transaction("dataStore", "readwrite");
//     const store = transaction.objectStore("dataStore");
  
//     const request = store.add({ key, value });
  
//     return new Promise((resolve, reject) => {
//       request.onsuccess = () => {
//         resolve();
//       };

//       request.onerror = (event: Event) => {
//         reject(`Error adding key-value: ${event}`);
//       };
//     });
//   }
  
//   // Function to update the value of an existing key
//   async function updateKeyValue(db: IDBDatabase, key: string, value: any): Promise<void> {
//     const transaction = db.transaction("dataStore", "readwrite");
//     const store = transaction.objectStore("dataStore");
  
//     const request = store.getAll(); // Fetch all records
  
//     return new Promise((resolve, reject) => {
//       request.onsuccess = () => {
//         const allData = request.result;
//         const record = allData.find((item: any) => item.key === key);
  
//         if (record) {
//           record.value = value; // Update the value
//           const updateRequest = store.put(record);
  
//           updateRequest.onsuccess = () => {
//             resolve();
//           };
  
//           updateRequest.onerror = (event: Event) => {
//             reject(`Error updating key-value: ${event}`);
//           };
//         } else {
//           reject(`Key not found: ${key}`);
//         }
//       };
  
//       request.onerror = (event: Event) => {
//         reject(`Error fetching data for update: ${event}`);
//       };
//     });
//   }
  
//   // Function to delete a key from the database
//   async function deleteKey(db: IDBDatabase, key: string): Promise<void> {
//     const transaction = db.transaction("dataStore", "readwrite");
//     const store = transaction.objectStore("dataStore");
  
//     const request = store.getAll(); // Fetch all records
  
//     return new Promise((resolve, reject) => {
//       request.onsuccess = () => {
//         const allData = request.result;
//         const record = allData.find((item: any) => item.key === key);
  
//         if (record) {
//           const deleteRequest = store.delete(record.key);
  
//           deleteRequest.onsuccess = () => {
//             resolve();
//           };
  
//           deleteRequest.onerror = (event: Event) => {
//             reject(`Error deleting key: ${event}`);
//           };
//         } else {
//           reject(`Key not found: ${key}`);
//         }
//       };
  
//       request.onerror = (event: Event) => {
//         reject(`Error fetching data for delete: ${event}`);
//       };
//     });
//   }
  
//   // Function to delete the entire database
//   async function deleteDatabase(dbName: string): Promise<void> {
//     const request = indexedDB.deleteDatabase(dbName);
  
//     return new Promise((resolve, reject) => {
//       request.onsuccess = () => {
//         resolve();
//       };
  
//       request.onerror = (event: Event) => {
//         reject(`Error deleting database: ${event}`);
//       };
//     });
//   }
  