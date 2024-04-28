import {
  getUserFiles,
  uploadFileToS3AndFirebase,
  getFileMetadata,
  deleteFileMetadata,
} from "../controllers/file.controller";
import express from "express";
import multer from "multer";
import path from "path";
import { authMiddleware, checkFileOwnership } from "../middlewares/middleware";

// Configure Multer middleware (adjust destination folder as needed)
const filePath = path.resolve(__dirname, "../uploads");
const upload = multer({ dest: filePath });

const fileRouter = express.Router();

fileRouter.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadFileToS3AndFirebase
);
fileRouter.get("/", authMiddleware, getUserFiles);
fileRouter.get("/:fileId", authMiddleware, checkFileOwnership, getFileMetadata);
fileRouter.delete(
  "/:fileId",
  authMiddleware,
  checkFileOwnership,
  deleteFileMetadata
);

export { fileRouter };
