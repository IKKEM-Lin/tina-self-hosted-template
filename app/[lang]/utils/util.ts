import { i18n } from "@/share/i18n-config";

export function generateLangParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const fixTinaResults = <T>(data: T): T => {
  try {
    const serializedData = JSON.stringify(data);
    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error("Error in serializing/deserializing data:", error);
    throw new Error("Handling data failed");
  }
};
