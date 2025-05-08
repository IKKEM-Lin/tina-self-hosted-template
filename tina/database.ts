import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { databaseAdapter } from "./databaseAdapter";
import { gitProvider } from "./gitProvider";
import { isLocal } from "@/share/env";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider,
      databaseAdapter,
    });
