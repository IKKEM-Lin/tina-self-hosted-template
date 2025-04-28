import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
// import { SqliteLevel } from "sqlite-level";
// TODO: use official package after these PRs are merged:
//            https://github.com/tinacms/sqlite-level/pull/21
//            https://github.com/tinacms/sqlite-level/pull/22
import { SqliteLevel } from "./SqliteAdapter";
import path from "path";
import { gitProvider } from "./gitProvider";

const isLocal = process.env.TINA_PUBLIC_ENV === "local";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider,
      databaseAdapter: new SqliteLevel({
        filename: path.join(process.cwd(), "sqliteDB", "tinacms.db"),
      }),
    });
