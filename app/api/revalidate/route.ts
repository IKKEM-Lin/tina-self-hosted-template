import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { isSSG } from "@/share/env";

export async function GET(request: NextRequest) {
  if (isSSG) {
    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: "Disable in SSG environment",
    });
  }
  const path = request.nextUrl.searchParams.get("path");
  const tag = request.nextUrl.searchParams.get("tag");

  if (path) {
    await revalidatePath(path as string);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  if (tag) {
    await revalidateTag(tag as string);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path or tag to revalidate",
  });
}
