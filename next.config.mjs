/** @type {import('next').NextConfig} */
const isSSG = process.env.TINA_PUBLIC_ENV === "ssg";
const SSG_BASE_PATH = process.env.SSG_BASE_PATH || "";

const nextConfig = isSSG
  ? {
      output: "export",
      basePath: SSG_BASE_PATH,
      images: {
        loader: "custom",
        loaderFile: "./share/ssg-image-loader.ts",
      },
    }
  : {
      images: { unoptimized: true },
    };

export default nextConfig;
