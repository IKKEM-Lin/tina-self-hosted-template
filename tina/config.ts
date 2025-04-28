import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";
import * as collections from "./collections";
import { CustomSearchClient } from "@/share/tina-search/searchClient";

const isLocal = process.env.TINA_PUBLIC_ENV === "local";
const isSSG = process.env.TINA_PUBLIC_ENV === "ssg";

const mediaConfig = isLocal
  ? {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    }
  : {
      loadCustomStore: async () => {
        const pack = await import("@/share/tina-media/customMediaSore");
        return pack.CustomMediaStore;
      },
    };

export default defineConfig({
  contentApiUrlOverride: isLocal ? undefined : "/api/tina/gql",
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [TinaUserCollection, ...Object.values(collections)],
  },

  media: mediaConfig,
  cmsCallback(cms) {
    if (isSSG || !isLocal) return cms;
    cms.registerApi("search", new CustomSearchClient());
    return cms;
  },
  search: isSSG
    ? undefined
    : isLocal
    ? {
        // bypass because limitation in tinacms
        searchClient: {} as any,
      }
    : {
        searchClient: new CustomSearchClient(),
      },
});
