import * as AWS from "aws-sdk";
import * as firebaseAdmin from "firebase-admin";
import * as fs from "fs";
import * as https from "https";
import * as path from "path";
import axios from "axios";

import { AWSConfig } from "../../config/config";
import { FirebaseConfig } from "../../config/config";
const filePath = path.resolve(__dirname, "../uploads");

const firebaseJSON = path.resolve(
  __dirname,
  "../../fileshield-jagah-firebase.json"
);

const s3 = new AWS.S3({
  accessKeyId: AWSConfig.AWS_ACCESS_KEY,
  secretAccessKey: AWSConfig.AWS_SECRET_KEY,
});

try {
  const serviceAccountRaw = fs.readFileSync(firebaseJSON, "utf8");
  // Parse the JSON string into the correct type
  const firebaseServiceAccount: firebaseAdmin.ServiceAccount =
    JSON.parse(serviceAccountRaw);

  // Initialize Firebase Admin SDK
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    storageBucket: FirebaseConfig.FIREBASE_STORAGE_BUCKET,
  });
} catch (error) {
  console.error("Error reading file:", error);
}

// Function to upload file to S3
const uploadToS3 = async (
  filePath: string,
  fileName: string
): Promise<string> => {
  const fileContent = fs.readFileSync(filePath);

  const params: AWS.S3.Types.PutObjectRequest = {
    Bucket: "fileshield",
    Key: fileName,
    Body: fileContent,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err: any, data: any) => {
      if (err) reject(err);
      else resolve(data.Location || ""); // Returns the URL of the uploaded file
    });
  });
};

// Function to upload file to Firebase Storage
export const uploadToFirebase = async (
  filePath: string,
  fileName: string
): Promise<string> => {
  const bucket = firebaseAdmin.storage().bucket();
  const file = bucket.file(fileName);

  try {
    await file.save(fs.createReadStream(filePath));
    return `gs://${bucket.name}/${file.name}`;
  } catch (error) {
    throw error;
  }
};

// Function to fetch file from Firebase Storage
export const fetchFileFromFirebase = async (
  fileName: string
): Promise<string> => {
  try {
    const storage=firebaseAdmin.storage()
    const bucket=storage.bucket()
    // Create a reference to the file
    const fileRef = bucket.file(fileName);

    // Get a signed URL for the file
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now
    const [signedUrl] = await fileRef.getSignedUrl({
      action: "read",
      expires: expiryDate,
    });

    // Return the signed URL
    return signedUrl;
  } catch (error) {
    throw error;
  }
};


