import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { lookup } from "mime-types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileName } = req.query;
  if (!fileName) {
    return res.status(400).json({ error: "Missing file name" });
  }
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    typeof fileName === "string" ? fileName : fileName.join("/")
  );

  if (fs.existsSync(filePath)) {
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader(
      "Content-Type",
      lookup(filePath) || "application/octet-stream"
    );
    res.send(imageBuffer);
  } else {
    res.status(404).json({ error: "File not found" });
  }
}
