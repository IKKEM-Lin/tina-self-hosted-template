import { join } from "path";
import fs from "fs";
import multer from "multer";
import { MediaModel, PathConfig } from "./media";
import type { NextApiRequest, NextApiResponse } from "next";

const mediaConfig: PathConfig = {
  rootPath: process.cwd(),
  publicFolder: "public",
  mediaRoot: "uploads",
};

const mediaFolder = join(
  mediaConfig.rootPath,
  mediaConfig.publicFolder,
  mediaConfig.mediaRoot
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, mediaFolder);
  },
  filename: function (req, _file, cb) {
    const file = req.query.path;
    cb(null, file as any);
  },
});

const upload = multer({ storage });
const uploadRoute = upload.single("file");
const mediaModel = new MediaModel(mediaConfig);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { path, cursor, limit },
    body,
  } = req;

    if (method === "GET") {
    try {
      const media = await mediaModel.listMedia({
        searchPath: path as string || "",
        cursor: cursor as string,
        limit: limit as string,
      });
      res.status(200).json(media);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else if (method === "DELETE") {
    try {
      const didDelete = await mediaModel.deleteMedia({ searchPath: path as string });
      res.status(200).json(didDelete);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else if (method === "POST") {
    // TODO: add image compress and resize
    const pathFix = path as string || "/"
    const media = await mediaModel.listMedia({
      searchPath: pathFix.split("/").slice(0, -1).join("/"),
      cursor: "0",
      limit: "200",
    });
    if (media.files.some(item => pathFix.toLowerCase() ===  item.filename.toLowerCase() || pathFix.toLowerCase().endsWith("/" + item.filename.toLowerCase()))) {
      res.status(409).json({ message: "File already exists" });
      return;
    }

    const folderPath = join(mediaFolder, pathFix.split("/").slice(0, -1).join("/"));
    // console.log("uploading file", folderPath);
    fs.existsSync(folderPath) || fs.mkdirSync(folderPath, { recursive: true });
    
    uploadRoute(req as any, res as any, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ message: err.message });
      } else if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
