import { Collection, Template } from "tinacms";

export const header: Template = {
  name: "header",
  label: "Header",
  ui: {
    defaultItem: {
      logo: "",
      menu: [],
    },
  },
  fields: [
    {
      label: "Logo",
      name: "logo",
      type: "image",
    },
    {
      label: "Menu",
      name: "menu",
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
          label: "Title",
          name: "title",
          type: "string",
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
        {
          label: "Sub Menu",
          name: "submenu",
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
              label: "Title",
              name: "title",
              type: "string",
            },
            {
              label: "Link",
              name: "link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      label: "Github link",
      name: "github_link",
      type: "string",
    },
  ],
};

export const footer: Template = {
  name: "footer",
  label: "Footer",
  ui: {
    defaultItem: {
      intro: "",
    },
  },
  fields: [
    {
      label: "Introduction",
      name: "intro",
      type: "rich-text",
    },
    {
      label: "Copy right",
      name: "copy_right",
      type: "string",
    },
    {
      label: "Other links",
      name: "other_links",
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
};

export const globalCollection: Collection<false> = {
  name: "global",
  label: "Global Settings",
  path: "content/global",
  fields: [
    {
      ...header,
      name: "header",
      required: true,
      type: "object",
    },
    {
      ...footer,
      name: "footer",
      required: true,
      type: "object",
    },
  ],
  ui: {
    allowedActions: {
      create: true,
      delete: true,
      createNestedFolder: false,
    },
  },
};
