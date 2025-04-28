import { Collection, Template } from "tinacms";
import { routerFn } from "./util";
import { i18n } from "@/share/i18n-config";

export const homeCollection: Collection<false> = {
  name: "home",
  label: "Home Page",
  path: "content/home",
  format: "md",
  fields: [
    {
      label: "Tag text",
      name: "tag",
      type: "string",
    },
    {
      label: "Introduction",
      name: "intro",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Button",
      name: "links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.title,
          label: item.title,
        }),
      },
      fields: [
        {
          label: "Primary",
          name: "primary",
          type: "boolean",
        },
        {
          label: "title",
          name: "title",
          type: "string",
        },
        {
          label: "link",
          name: "link",
          type: "string",
        },
        {
          label: "newTab",
          name: "newTab",
          type: "boolean",
        },
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      const filename = document._sys.filename.split(".")[0];
      if (i18n.locales.some((locale) => filename.startsWith(`${locale}_`))) {
        const lang = filename.split("_")[0];
        // const path = filename.replace(new RegExp(`^${lang}_`), "");
        return `/${lang}`;
      }
    },
  },
};
