// import { SqliteLevel } from "sqlite-level";
// TODO: use official package after these PRs are merged:
//            https://github.com/tinacms/sqlite-level/pull/21
//            https://github.com/tinacms/sqlite-level/pull/22
import { SqliteLevel } from "./SqliteAdapter";
import { RedisKVAdapter } from "./RedisAdapter";
import { MongodbAdapter } from "./MongodbAdapter";
import { AbstractLevel } from "abstract-level";

import path from "path";
import {
  isSqlite,
  isMongo,
  isRedis,
  sqliteDbPath,
  mongodbUri,
  mongodbCollectionName,
  mongodbDbName,
  redisUri,
  redisNamespace,
  redisDebug,
} from "@/share/env";

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
