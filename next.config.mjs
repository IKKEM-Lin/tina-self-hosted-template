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
      env: {
        GITHUB_REPO:
          process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG,
        GITHUB_OWNER:
          process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER,
        GIT_COMMIT_BRANCH:
          process.env.GIT_COMMIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF,
      },
    };

export default nextConfig;
