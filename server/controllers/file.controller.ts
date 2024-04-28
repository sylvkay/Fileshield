import { Request, Response } from "express";
import { uploadToFirebase, fetchFileFromFirebase } from "./cloud/cloud";
import { FileMetadata } from "../models/File";
import fs from "fs";
import path from "path";
import axios from "axios";
import {
  createFileMetadata,
  deleteFileMetadataById,
  getFileMetadataById,
  getUserFilesById,
} from "../services/FileService";

async function uploadFileToS3AndFirebase(req: Request, res: Response) {
  try {
    if (!req.file || !req.body.fileName) {
      return res
        .status(400)
        .json({ message: "File and fileName are required" });
    }
    if (!req.body.cloud_provider) {
      return res
        .status(400)
        .json({ message: "Preferred Cloud provider is required" });
    }
    if (!req.body.encryption_method) {
      return res.status(400).json({ message: "Encryption Method is required" });
    }

    // additional info
    if (!req.body.file_size) {
      return res.status(400).json({ message: "File size is required" });
    }

    const fileName = req.body.fileName;
    const file = req.file;
    let cloudUrl = "";

    if (req.body.cloud_provider.toLowerCase() == "aws") {
      // const s3Url = await uploadToS3(file.path, fileName);
      // cloudUrl = s3Url;
    } else if (req.body.cloud_provider.toLowerCase() == "firebase") {
      const firebaseUrl = await uploadToFirebase(file.path, fileName);
      cloudUrl = firebaseUrl;
    }

    const metadata: FileMetadata = {
      id: 1,
      user_id: Number(req.user_id),
      file_name: fileName,
      cloud_url: cloudUrl,
      cloud_provider: req.body.cloud_provider,
      encryption_method: req.body.encryption_method,
      file_size: req.body.file_size,
    };

    console.log(metadata);

    await createFileMetadata(metadata);

    // Clean up the local file
    fs.unlinkSync(file.path);

    res
      .status(200)
      .json({ message: "Uploaded to Cloud Successfully", fileName, cloudUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(400).json({ message: "Error uploading file" });
  }
}

async function getUserFiles(req: Request, res: Response) {
  try {
    const userId = req.user_id;
    const files = await getUserFilesById(Number(userId));
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching user files:", error);
    res.status(400).json({ message: "Error fetching user files" });
  }
}

async function getFileMetadata(req: Request, res: Response) {
  try {
    const userId = req.user_id;
    const files: any = await getFileMetadataById(Number(req.params.fileId));

    let url: any = files?.cloud_url;

    url = await fetchFileFromFirebase(String(files.file_name));

    files.access_url = url;

    // Fetch the file content using Axios
    const response = await axios.get(url, { responseType: "blob" });

    files.encrypted_string = response.data;

    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching user files:", error);
    res.status(400).json({ message: "Error fetching file" });
  }
}

async function deleteFileMetadata(req: Request, res: Response) {
  const userId = req.user_id;

  const fileMetadataID: number = Number(req.params.fileId);

  const deletedFile = await deleteFileMetadataById(fileMetadataID);
  console.log(deletedFile);

  getUserFiles(req, res);
}

// Export the controller function
export {
  uploadFileToS3AndFirebase,
  getUserFiles,
  getFileMetadata,
  deleteFileMetadata,
};
