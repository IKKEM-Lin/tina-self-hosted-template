import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import databaseClient from "@/tina/__generated__/databaseClient";
import { isLocal, NEXTAUTH_SECRET } from "@/share/env";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: NEXTAUTH_SECRET as string,
        }),
      }),
  databaseClient,
});

const server = (req: any, res: any) => {
  // Modify the request here if you need to
  return handler(req, res);
};

export default server;
