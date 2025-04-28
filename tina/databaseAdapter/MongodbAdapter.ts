import { MongodbLevel } from "mongodb-level";

export class MongodbAdapter extends MongodbLevel {
  constructor(
    mongoUri: string,
    collectionName = "tinacms",
    dbName = "tinacms"
  ) {
    super({
      collectionName,
      dbName,
      mongoUri,
    });
  }
}
