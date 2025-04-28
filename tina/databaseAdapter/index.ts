
// import { SqliteLevel } from "sqlite-level";
// TODO: use official package after these PRs are merged:
//            https://github.com/tinacms/sqlite-level/pull/21
//            https://github.com/tinacms/sqlite-level/pull/22
import { SqliteLevel } from "./SqliteAdapter";
import { VercelKVAdapter } from "./VercelKVAdapter";
import { MongodbAdapter } from "./MongodbAdapter";
import { AbstractLevel } from "abstract-level";
import path from "path";

const isSqlite = process.env.DATABASE_TYPE === "sqlite";
const isMongo = process.env.DATABASE_TYPE === "mongodb";
const isVercel = process.env.DATABASE_TYPE === "vercelKV";

const sqliteDbPath = process.env.SQLITE_DB_PATH || "sqliteDB/tinacms.db";

const mongodbUri = process.env.MONGODB_URI;
const mongodbCollectionName = process.env.MONGODB_COLLECTION_NAME || "tinacms";
const mongodbDbName = process.env.MONGODB_DB_NAME || "tinacms";

const vercelKVUrl = process.env.VERCEL_KV_REST_API_URL;
const vercelKVToken = process.env.VERCEL_KV_REST_API_TOKEN;
const vercelKVNamespace = process.env.VERCEL_KV_NAMESPACE || "tinacms";
const vercelKVDebug = process.env.VERCEL_KV_DEBUG === "true";

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
} else if (isVercel && vercelKVUrl && vercelKVToken) {
  databaseAdapter = new VercelKVAdapter(
    vercelKVUrl,
    vercelKVToken,
    vercelKVNamespace,
    vercelKVDebug
  ) as any;
} else {
  throw new Error("No valid database adapter found");
}

export { databaseAdapter };
