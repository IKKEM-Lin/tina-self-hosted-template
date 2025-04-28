"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { HomeQuery } from "@/tina/__generated__/types";
import Link from "next/link";
import { Button } from "../component/ui/button";

const Home = (props: any) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data as HomeQuery,
  });

  const { intro, links, tag } = data.home;

  return (
    <>
      <main className="max-w-[1440px] mx-auto">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute inset-0 grid grid-cols-6 gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="col-span-1 h-full flex flex-col gap-2">
                  {Array.from({ length: 20 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-8 rounded"
                      style={{
                        background:
                          Math.random() > 0.8 ? "#EC4815" : "transparent",
                        opacity: Math.random() * 0.5 + 0.25,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="container relative z-10 px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                data-tina-field={tinaField(data.home, "tag")}
                className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              >
                {tag}
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Content Management,{" "}
                <span className="bg-gradient-to-r from-[#EC4815] to-[#eb6440] bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>
              <p
                data-tina-field={tinaField(data.home, "intro")}
                className="max-w-[800px] text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                {intro}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {links?.map(
                  (item) =>
                    item && (
                      <Link
                        key={item.title}
                        href={item.link || ""}
                        target={item.newTab ? "_blank" : "_self"}
                        data-tina-field={tinaField(item, "link")}
                      >
                        <Button
                          className={`h-11 px-8 text-lg cursor-pointer ${
                            item.primary
                              ? "bg-primary bg-gradient-to-r text-white from-[#EC4815] to-[#eb6440]"
                              : ""
                          } rounded-md`}
                          variant={item.primary ? undefined : "outline"}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    )
                )}
              </div>

              {/* Editor Preview */}
              <div className="mt-12 w-full max-w-5xl rounded-lg border-2 border-muted shadow-xl overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-muted-foreground">
                    TinaCMS Editor
                  </span>
                </div>
                <div className="bg-card p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 border rounded-md p-4 bg-background">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-6 w-6 rounded bg-primary"></div>
                      <div className="h-4 w-24 rounded bg-muted"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-muted"></div>
                      <div className="h-4 w-3/4 rounded bg-muted"></div>
                      <div className="h-4 w-4/5 rounded bg-muted"></div>
                    </div>
                    <div className="mt-4">
                      <div className="h-24 w-full rounded bg-muted"></div>
                    </div>
                  </div>
                  <div className="flex-1 border rounded-md p-4 bg-background">
                    <div className="space-y-2">
                      <div className="h-8 w-1/2 rounded bg-primary/20"></div>
                      <div className="h-12 w-full rounded bg-muted"></div>
                      <div className="h-12 w-full rounded bg-muted"></div>
                      <div className="h-24 w-full rounded bg-muted"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
