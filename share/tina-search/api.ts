import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import fs from "fs-extra";

const contentConfig = {
  rootPath: process.cwd(),
  contentFolder: "content",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { path, kw: keyword } = req.query;

    try {
      const folderPath = join(
        contentConfig.rootPath,
        contentConfig.contentFolder,
        path as string
      );

      let filesStr: string[] = [];
      try {
        filesStr = await fs.readdir(folderPath);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Error reading directory" });
      }

      const filteredFiles = filesStr
        .filter((item) => !keyword || item.includes(keyword as string))
        .map((file) => ({ _id: `${path}:${file}` }));

      return res.status(200).json(filteredFiles);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
