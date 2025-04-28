import { fixTinaResults, generateLangParams } from "./utils/util";
import client from "@/share/client";
import { Locale } from "@/share/i18n-config";
import HomeComp from "./home/Home";

export default async function Home({
  params,
}: Readonly<{
  params: { lang: Locale };
}>) {
  let variables = { relativePath: `${params.lang}_home.md` };
  try {
    const rawResult = await client.queries.home(variables);
    const res = fixTinaResults(rawResult);
    const props = {
      query: res.query,
      variables: res.variables,
      data: res.data,
    };

    return <HomeComp {...props} lang={params.lang} />;
  } catch (err: any) {
    return <div>{err.message}</div>;
  }
}

export async function generateStaticParams() {
  return generateLangParams();
}
