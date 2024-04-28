
// import * as path from "path";
const fs = require('fs');
const firebaseAdmin = require('firebase-admin');
const dotEnv = require('dotenv');
dotEnv.config();

const serviceAccount = require('./storage-firebase.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

// Function to download files from Firebase Storage
async function downloadFilesFromFirebase() {
  const bucket = firebaseAdmin.storage().bucket();
  const folderName = './Downloads';

  // Create the "upload" folder if it doesn't exist
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log('Upload folder created');
  }

  try {
    // Get list of files from Firebase Storage
    const [files] = await bucket.getFiles();

    // Download each file and save it to the "upload" folder
    files.forEach(async file => {
      const destination = `${folderName}/${file.name}`;
      await file.download({ destination });
      console.log(`File ${file.name} downloaded to ${destination}`);
    });

    console.log('All files downloaded successfully.');
  } catch (error) {
    console.error('Error downloading files:', error);
  }
}

// Call the function to download files
downloadFilesFromFirebase();
