import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { databaseAdapter } from "./databaseAdapter";
import { gitProvider } from "./gitProvider";

const isLocal = process.env.TINA_PUBLIC_ENV === "local";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider,
      databaseAdapter,
    });
