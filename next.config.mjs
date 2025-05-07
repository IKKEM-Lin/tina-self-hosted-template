/** @type {import('next').NextConfig} */
const isSSG = process.env.TINA_PUBLIC_ENV === "ssg";

const nextConfig = isSSG
  ? {
      output: "export",
      images: {
        loader: "custom",
        loaderFile: "./share/ssg-image-loader.ts",
      },
    }
  : {
      images: { unoptimized: true },
    };

export default nextConfig;
