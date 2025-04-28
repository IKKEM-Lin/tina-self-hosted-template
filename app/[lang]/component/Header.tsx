import React from "react";
import HeaderComp from "../client_component/Header";
import client from "@/share/client";
import { fixTinaResults } from "../utils/util";
import { Locale } from "@/share/i18n-config";

const Header = async (props: { lang: Locale }) => {
  const lang = props.lang;
  let variables = { relativePath: `${lang}_index.md` };
  const rawResult = await client.queries.global(variables);
  const res = fixTinaResults(rawResult);

  return (
    <HeaderComp
      query={res.query}
      variables={res.variables}
      data={res.data}
      lang={lang}
    />
  );
};

export default Header;
