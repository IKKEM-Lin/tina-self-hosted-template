"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import { GlobalQuery } from "@/tina/__generated__/types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../component/ui/popover";
import Translation from "./Translation";

const LinkWithSubmenu: FC<{
  item: Exclude<GlobalQuery["global"]["header"]["menu"], null | undefined>[0];
}> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!item) return null;
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <PopoverTrigger
          className={`cursor-pointer py-4 flex justify-start items-center gap-1 outline-none`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Link
            href={item.link || ""}
            data-tina-field={tinaField(item, "title")}
          >
            {item.title}
          </Link>
        </PopoverTrigger>
        {/* {isOpen && ( */}
        <PopoverContent
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          sideOffset={-4}
          className="flex flex-col z-[1000] bg-white shadow-md px-0 w-auto min-w-[100px]"
          // static
        >
          {item.submenu?.map(
            (subitem) =>
              subitem && (
                <Link
                  href={subitem.link || ""}
                  key={subitem.title}
                  className="hover:text-primary hover:bg-gray-50 text-sm leading-[32px] px-3"
                  data-tina-field={tinaField(subitem)}
                >
                  {subitem.title
                    ?.toLowerCase()
                    ?.trim()
                    ?.startsWith("isaiec") ? (
                    <>
                      <i>i</i>
                      {subitem.title?.slice(1)}
                    </>
                  ) : (
                    subitem.title
                  )}
                </Link>
              )
          )}
        </PopoverContent>
        {/* )} */}
      </div>
    </Popover>
  );
};

const Header = (props: any) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data as GlobalQuery,
  });
  // const dict = await getDictionary(lang);

  const { menu, github_link } = data.global.header;
  const lang = props.lang;
  return (
    <header className="shadow-sm bg-white sticky top-0 z-[999] py-2 px-4">
      <section className="flex justify-between max-w-[1440px] mx-auto m-auto mobile:items-center">
        <Link href={"/"} className="flex items-center">
          <Image
            data-tina-field={tinaField(data.global.header, "logo")}
            src={data.global.header.logo || ""}
            width={140}
            height={40}
            alt="logo"
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-10 mobile:hidden">
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {menu?.map((item) =>
              item?.submenu?.length ? (
                <LinkWithSubmenu key={item.title} item={item} />
              ) : (
                <Link
                  href={item!.link || ""}
                  key={item!.title}
                  className={"hover:text-primary"}
                  data-tina-field={item && tinaField(item)}
                >
                  {item!.title}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Translation lang={lang} />
          <a
            href={github_link || ""}
            data-tina-field={tinaField(data.global.header, "github_link")}
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/uploads/github.svg"
              width={30}
              height={30}
              alt="github logo"
            />
          </a>
        </div>
      </section>
    </header>
  );
};

export default Header;
