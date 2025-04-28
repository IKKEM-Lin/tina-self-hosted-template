"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { GlobalQuery } from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Button } from "../component/ui/button";

const Footer = (props: any) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data as GlobalQuery,
  });
  // const dict = await getDictionary(lang);
  const footer = data.global.footer;
  const header = data.global.header;
  const lang = props.lang;
  return (
    <footer className="w-full border-t py-12 md:py-16 lg:py-20 bg-background">
      <div className="container px-4 md:px-6  max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 flex flex-col">
            <Link href={"/"} className="flex items-center mb-4">
              <Image
                data-tina-field={tinaField(header, "logo")}
                src={header.logo || ""}
                width={140}
                height={40}
                alt="logo"
                className="object-contain"
              />
            </Link>
            <div
              data-tina-field={tinaField(footer, "intro")}
              className="text-sm text-muted-foreground"
            >
              <TinaMarkdown
                components={{}}
                content={data.global.footer?.intro}
              />
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/tinacms/tinacms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://twitter.com/tinacms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://discord.com/invite/zumN63Ybpf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <path d="M18 9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V9Z" />
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="15" cy="12" r="1" />
                </svg>
              </a>
            </div>
          </div>

          {header.menu?.map((item) => (
            <div key={item?.title} className="md:col-span-1">
              <h3
                className="text-lg font-semibold mb-4"
                data-tina-field={tinaField(item, "title")}
              >
                {item?.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {item?.submenu?.map((subitem) => (
                  <li>
                    <Link
                      href={subitem?.link || ""}
                      data-tina-field={tinaField(subitem, "title")}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {subitem?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and releases.
            </p>
            <form className="space-y-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p
            data-tina-field={tinaField(footer, "copy_right")}
            className="text-sm text-muted-foreground mb-4 md:mb-0"
          >
            {footer.copy_right}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {footer?.other_links?.map((item) => (
              <Link
                key={item?.title}
                href={item?.link || ""}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-tina-field={tinaField(item, "title")}
                target={item?.newTab ? "_blank" : "_self"}
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
