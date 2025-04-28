// The file will run in the browser

import { client as databaseClient } from "@/tina/__generated__/databaseClient";
import { client as localClient } from "@/tina/__generated__/client";

const isLocal = process.env.TINA_PUBLIC_ENV === "local";

let client = isLocal ? localClient : databaseClient;

export default client;
