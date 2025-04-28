import React from "react";
import { Locale } from "@/share/i18n-config";
import client from "@/share/client";
import FooterComp from "../client_component/Footer";
import { fixTinaResults } from "../utils/util";

const Footer = async (props: { lang: Locale }) => {
  const lang = props.lang;
  let variables = { relativePath: `${lang}_index.md` };
  const rawResult = await client.queries.global(variables);
  const res = fixTinaResults(rawResult);
  return (
    <FooterComp
      query={res.query}
      variables={res.variables}
      data={res.data}
      lang={lang}
    />
  );
};

export default Footer;
