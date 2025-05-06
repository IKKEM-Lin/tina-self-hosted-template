// import { SqliteLevel } from "sqlite-level";
// TODO: use official package after these PRs are merged:
//            https://github.com/tinacms/sqlite-level/pull/21
//            https://github.com/tinacms/sqlite-level/pull/22
import { SqliteLevel } from "./SqliteAdapter";
import { RedisKVAdapter } from "./RedisAdapter";
import { MongodbAdapter } from "./MongodbAdapter";
import { AbstractLevel } from "abstract-level";

import path from "path";

const isSqlite = process.env.DATABASE_TYPE === "sqlite";
const isMongo = process.env.DATABASE_TYPE === "mongodb";
const isRedis = process.env.DATABASE_TYPE === "redis";

const sqliteDbPath = process.env.SQLITE_DB_PATH || "sqliteDB/tinacms.db";

const mongodbUri = process.env.MONGODB_URI;
const mongodbCollectionName = process.env.MONGODB_COLLECTION_NAME || "tinacms";
const mongodbDbName = process.env.MONGODB_DB_NAME || "tinacms";

const redisUri = process.env.REDIS_URI;
const redisNamespace = process.env.REDIS_NAMESPACE || "tinacms";
const redisDebug = process.env.REDIS_DEBUG === "true";

let databaseAdapter: AbstractLevel<
  Buffer | Uint8Array | string,
  string,
  string
>;

if (isSqlite) {
  databaseAdapter = new SqliteLevel({
    filename: path.join(process.cwd(), sqliteDbPath),
  });
} else if (isMongo && mongodbUri) {
  databaseAdapter = new MongodbAdapter(
    mongodbUri,
    mongodbCollectionName,
    mongodbDbName
  );
} else if (isRedis && redisUri) {
  databaseAdapter = new RedisKVAdapter(
    redisUri,
    redisNamespace,
    redisDebug
  ) as any;
} else {
  throw new Error("No valid database adapter found");
}

export { databaseAdapter };
