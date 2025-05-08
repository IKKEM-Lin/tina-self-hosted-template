import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import { defineConfig, LocalAuthProvider } from "tinacms";
import * as collections from "./collections";
import { CustomSearchClient } from "@/share/tina-search/searchClient";
import { isLocal, isSSG, isCloudinaryMedia } from "@/share/env";

const mediaConfig = isLocal
  ? {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    }
  : {
      loadCustomStore: async () => {
        let pack;
        switch (true) {
          case isCloudinaryMedia:
            pack = await import("@/share/cloudinary-media/cloudinaryMediaStore");
            break;
          default:
            pack = await import("@/share/local-media/customMediaStore");
        }
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
