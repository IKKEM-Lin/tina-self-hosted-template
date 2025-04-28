import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";

import databaseClient from "@/tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_ENV === "local";
// console.log("API TINA_PUBLIC_ENV: ", process.env.TINA_PUBLIC_ENV, isLocal);

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET as string,
        }),
      }),
  databaseClient,
});

const server = (req: any, res: any) => {
  // Modify the request here if you need to
  return handler(req, res);
};

export default server;
