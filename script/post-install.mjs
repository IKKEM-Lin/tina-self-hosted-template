import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../");
const addonBuildDir = path.join(
  rootDir,
  "addon-build",
  "release",
  "install-root"
);
const betterSqlite3Dir = path.join(
  rootDir,
  "node_modules",
  "better-sqlite3",
  "build",
  "Release"
);
const betterSqlite3File = path.join(betterSqlite3Dir, "better_sqlite3.node");
const targetFile = path.join(addonBuildDir, "better_sqlite3.node");

if (!fs.existsSync(addonBuildDir)) {
  fs.mkdirSync(addonBuildDir, { recursive: true });
}
if (!fs.existsSync(betterSqlite3File)) {
  console.error(
    'better_sqlite3.node not found, please run "npm install" first.'
  );
  process.exit(1);
}

// copy
fs.copyFileSync(betterSqlite3File, targetFile);
