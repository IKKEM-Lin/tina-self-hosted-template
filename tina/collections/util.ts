import type { UICollection } from "@tinacms/schema-tools";
import { i18n } from "@/share/i18n-config";

export const routerFnGen: (middlePath?: string) => UICollection["router"] = (middlePath = "") => ({ document }) => {
  const filename = document._sys.filename;
  if (i18n.locales.some((locale) => filename.startsWith(`${locale}_`))) {
    const lang = filename.split("_")[0];
    const path = filename.replace(new RegExp(`^${lang}_`), "");
    return `/${lang}${middlePath.startsWith("/") ? middlePath : ""}/${path}`;
  }
};

export const routerFn: UICollection["router"] = routerFnGen();
