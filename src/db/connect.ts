import IndexedDb from './indexedDb'
let indexedDb:any;
const dbName = 'notes';
const connect =  async() => {
  // const isExisting = (await window.indexedDB.databases()).map(db => db.name).includes(dbName);
  // if(isExisting) {
  //   indexedDb = await indexedDb.createObjectStore(['books', 'students']);

  // }
  indexedDb = new IndexedDb(dbName);
  await indexedDb.createObjectStore(['notes']);

}
export {connect, indexedDb}