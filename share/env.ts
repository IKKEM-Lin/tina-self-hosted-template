// run-time env variables, TINA_PUBLIC_ENV would be visible in the browser
export const isLocal = process.env.TINA_PUBLIC_ENV === "local";
export const isSSR = process.env.TINA_PUBLIC_ENV === "ssr";
export const isSSG = process.env.TINA_PUBLIC_ENV === "ssg";

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;



//  Media related env variables, TINA_PUBLIC_MEDIA_TYPE would be visible in the browser
export const isLocalMedia = process.env.TINA_PUBLIC_MEDIA_TYPE === "localMedia";
export const isCloudinaryMedia = process.env.TINA_PUBLIC_MEDIA_TYPE === "cloudinary";

export const cloudinaryURL = process.env.CLOUDINARY_URL || "";



// GIT related env variables
export const isGitLocal = process.env.GIT_TYPE === "local";
export const isGitLab = process.env.GIT_TYPE === "gitlab";
export const isGitHub = process.env.GIT_TYPE === "github";

export const gitlabHost = process.env.GITLAB_HOST as string;
export const gitlabProjectId = process.env.GITLAB_PROJECT_ID as string;
export const gitlabToken = process.env.GITLAB_PERSONAL_ACCESS_TOKEN as string;
 
export const githubOwner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER as string;
export const githubRepo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG as string;
export const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;
 
export const gitLocalCommitterName = process.env.GIT_LOCAL_COMMITTER_NAME as string;
export const gitLocalCommitterEmail = process.env.GIT_LOCAL_COMMITTER_EMAIL as string;
 
export const gitCommitMessage = process.env.GIT_COMMIT_MESSAGE as string || "content: Edited with TinaCMS";
export const gitCommitBranch = process.env.GIT_COMMIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF as string || "tina";



// Database related env variables
export const isSqlite = process.env.DATABASE_TYPE === "sqlite";
export const isMongo = process.env.DATABASE_TYPE === "mongodb";
export const isRedis = process.env.DATABASE_TYPE === "redis";

export const sqliteDbPath = process.env.SQLITE_DB_PATH || "sqliteDB/tinacms.db";

export const mongodbUri = process.env.MONGODB_URI;
export const mongodbCollectionName = process.env.MONGODB_COLLECTION_NAME || "tinacms";
export const mongodbDbName = process.env.MONGODB_DB_NAME || "tinacms";

export const redisUri = process.env.REDIS_URL;
export const redisNamespace = process.env.REDIS_NAMESPACE || "tinacms";
export const redisDebug = process.env.REDIS_DEBUG === "true";



if (process.env.ENV_DEBUG) {
  console.log("ENV_DEBUG: ", JSON.stringify(process.env, null, 2));
}