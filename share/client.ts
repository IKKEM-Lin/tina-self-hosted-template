// The file will run in the browser

import { client as databaseClient } from "@/tina/__generated__/databaseClient";
import { client as localClient } from "@/tina/__generated__/client";
import { isLocal } from "@/share/env";

let client = isLocal ? localClient : databaseClient;

export default client;
