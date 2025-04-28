import type { Metadata } from "next";
import "./globals.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { generateLangParams } from "./utils/util";
import { Locale } from "@/share/i18n-config";


export const metadata: Metadata = {
  title: "Tina self-hosted demo",
  description: "A self-hosted demo for TinaCMS",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html
      lang={params.lang}
    >
      <body>
        <Header lang={params.lang as any} />
        {children}
        <Footer lang={params.lang as any} />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return generateLangParams();
}
