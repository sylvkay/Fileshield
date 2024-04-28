import moment from "moment";
import CryptoJS from "crypto-js";
import { openDB } from "idb";

import { AppDispatch } from "@/redux/store";
import { deleteFile, getFile, uploadFile } from "@/redux/slices/fileSlice";
import { toast } from "react-toastify";
import { FileThatHaveNotBeenUploaded } from "./types";

// Function to convert string to Blob
export const stringToBlob = (str: string) => {
  return new Blob([str], { type: "text/plain" });
};

// Function to create File from Blob
export const blobToFile = (blob: any, fileName: string) => {
  return new File([blob], fileName, { type: "text/plain" });
};

export const stringToFile = (string: string, fileName: string) => {
  const convertedBlob = stringToBlob(string);
  const file = blobToFile(convertedBlob, fileName);

  return file;
};
//Function that creates blob from file
export function fileToBlob(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #ececec",

    minHeight: "2.5rem",
    minWidth: "13rem",

    borderRadius: "8px",
    fontSize: "0.85rem",
    color: "black",
    boxShadow: "none", // Remove box shadow
    "&:focus": {
      outline: "none", // Remove outline on focus
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none", // Remove the vertical line between indicator and text
  }),
  option: (provided: any) => ({
    ...provided,
    fontSize: "0.85rem", // Set font size of dropdown options
  }),
};

export function formatDate(isoDateString: string) {
  return moment(isoDateString).format("MMMM Do YYYY, h:mm:ss a");
}

// Function to determine the file type
export function determineFileType(content: string) {
  const fileExtension = content.split(".");

  return fileExtension[fileExtension.length - 1];
}

export function changeBlobToFile(
  blob: Blob,
  extension: string,
  filename: string
): File {
  let fileType: string = "";

  switch (extension) {
    case "txt":
      fileType = "text/plain";
      break;
    case "pdf":
      fileType = "application/pdf";
      break;
    case "png":
      fileType = "image/png";
      break;
    case "jpg":
    case "jpeg":
      fileType = "image/jpeg";
      break;
    case "doc":
    case "docx":
      fileType = "application/msword";
      break;
    case "xls":
    case "xlsx":
      fileType = "application/vnd.ms-excel";
      break;
    case "ppt":
    case "pptx":
      fileType = "application/vnd.ms-powerpoint";
      break;
    case "mp3":
      fileType = "audio/mpeg";
      break;
    case "mp4":
      fileType = "video/mp4";
      break;
    case "avi":
      fileType = "video/x-msvideo";
      break;
    case "zip":
      fileType = "application/zip";
      break;
    case "html":
      fileType = "text/html";
      break;
    case "css":
      fileType = "text/css";
      break;
    case "js":
      fileType = "text/javascript";
      break;
    case "json":
      fileType = "application/json";
      break;
    case "xml":
      fileType = "application/xml";
      break;
    case "svg":
      fileType = "image/svg+xml";
      break;
    case "gif":
      fileType = "image/gif";
      break;
    case "bmp":
      fileType = "image/bmp";
      break;
    case "tiff":
      fileType = "image/tiff";
      break;
    // Add more cases for other file types if needed

    default:
      throw new Error(`Unsupported extension: ${extension}`);
  }

  return new File([blob], `${filename}.${extension}`, { type: fileType });
}

export function handleEncryption(
  acceptedFile: any,
  encryptionPassword: string,
  encryptionMethod: string | null
): Promise<string> | string {
  console.log(encryptionPassword);
  if (!encryptionMethod || encryptionMethod.length === 0) {
    return "Please provide an exncryption method";
  }
  return new Promise((resolve, reject) => {
    switch (encryptionMethod) {
      case "blowfish":
        const readerBlowfish = new FileReader();

        readerBlowfish.onload = () => {
          const fileContent: any = readerBlowfish.result;
          const encryptedContent = CryptoJS.Blowfish.encrypt(
            fileContent,
            encryptionPassword
          ).toString();
          resolve(encryptedContent);
        };

        readerBlowfish.onerror = (error) => {
          reject(error);
        };

        readerBlowfish.readAsBinaryString(acceptedFile);
        break;

      // Add cases for other encryption methods
      case "aes":
        const readerAES = new FileReader();

        readerAES.onload = () => {
          const fileContent: any = readerAES.result;
          const encryptedContent = CryptoJS.AES.encrypt(
            fileContent,
            encryptionPassword
          ).toString();
          resolve(encryptedContent);
        };

        readerAES.onerror = (error) => {
          reject(error);
        };

        readerAES.readAsBinaryString(acceptedFile);
        break;

      case "des":
        const readerDES = new FileReader();

        readerDES.onload = () => {
          const fileContent: any = readerDES.result;
          const encryptedContent = CryptoJS.DES.encrypt(
            fileContent,
            encryptionPassword
          ).toString();
          resolve(encryptedContent);
        };

        readerDES.onerror = (error) => {
          reject(error);
        };

        readerDES.readAsBinaryString(acceptedFile);
        break;

      // case "sha256":
      //   const readerSha256 = new FileReader();

      //   readerSha256.onload = () => {
      //     const fileContent: any = readerSha256.result;
      //     const encryptedContent = CryptoJS.SHA256(fileContent).toString();
      //     resolve(encryptedContent);
      //   };

      //   readerSha256.onerror = (error) => {
      //     reject(error);
      //   };

      //   readerSha256.readAsBinaryString(acceptedFile);
      //   break;
      default:
        reject(new Error(`Unsupported encryption method: ${encryptionMethod}`));
    }
  });
}

export function getFirst25Characters(inputString: string = "") {
  if (inputString.length >= 1) {
    return [inputString.slice(0, 25), ". . .."].toString();
  } else {
    return "";
  }
}

//FIXME TAKE ME TO ANOTHER FILE --TEMPORAL

//add to indexed DB
export const addToDB = async (data: any) => {
  const db = await openDB("FileShield", 1);
  const tx = db.transaction("UnuploadedFileArray", "readwrite");
  const store = tx.objectStore("UnuploadedFileArray");
  await store.add(data);
  await tx.done;
};

// Get data from IndexedDB
export const getDataFromDB = async () => {
  const db = await openDB("FileShield", 1);
  const tx = db.transaction("UnuploadedFileArray", "readonly");
  const store = tx.objectStore("UnuploadedFileArray");
  return store.getAll();
};

const downloadFile = (blob: Blob, filename: string) => {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";

  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const downloadEncryptedOrDecryptedFile = async (
  type: string,
  fileName: string,
  id: number,
  dispatch: AppDispatch
) => {
  if (type === "encrypt") {
    const files: any = await getDataFromDBByNameAndId(fileName, id); // Assuming you have a function to retrieve file from IndexedDB by name

    const file = files[0];

    console.log(file);

    downloadFile(file.file, file.file_name);
  } else {
    const file: any = await getDataFromDBByNameAndId(fileName, id); // Assuming you have a function to retrieve file from IndexedDB by name

    if (file.length > 0) {
      const fileToBeDownlaoded = stringToFile(
        file[0].encrypted_string,
        file[0].file_name
      );
      downloadFile(fileToBeDownlaoded, `encrypted - ${fileName}`); // Download file from IndexedDB
    } else {
      const fileFromServer: any = await dispatch(getFile(id)); // Assuming you have a function to fetch file from server by id

      const fileToBeDownlaoded = stringToFile(
        fileFromServer.payload.encrypted_string,
        fileFromServer.payload.file_name
      );

      downloadFile(fileToBeDownlaoded, fileName); // Download file from IndexedDB
    }
  }
};

export const getDataFromDBByNameAndId = async (
  fileName: string,
  id: number
) => {
  const db = await openDB("FileShield", 1);
  const tx = db.transaction("UnuploadedFileArray", "readonly");
  const store = tx.objectStore("UnuploadedFileArray");

  const allFiles = await store.getAll();

  // Filter the files based on the fileName
  const filesWithName = allFiles.filter(
    (file) => file.file_name === fileName && file.id === id
  );
  return filesWithName;
};
// Function to remove an entry from IndexedDB by ID
export const removeEntryByIdFromDB = async (id: number) => {
  try {
    // Open a connection to IndexedDB
    const db = await openDB("FileShield", 1);

    // Start a transaction with readwrite mode
    const tx = db.transaction("UnuploadedFileArray", "readwrite");

    // Access the object store
    const store = tx.objectStore("UnuploadedFileArray");

    // Remove the entry with the given ID
    await store.delete(id);

    // Complete the transaction
    await tx.oncomplete;

    console.log(`Entry with ID ${id} removed successfully from IndexedDB`);
  } catch (error) {
    console.error("File doesn't exist in DB", error);
  }
};

export const checkIfDataIsInIndexedDB = async (
  fileName: string,
  id: number
) => {
  const file = await getDataFromDBByNameAndId(fileName, id);

  const result = file.length > 0 ? true : false;

  return result;
};

export const uploadFileToCloudAndRemoveFromIndexDB = async (
  file: any,
  fileName: string,
  cloud_provider: string,
  encryption_method: string,
  file_size: string,
  id: number,
  dispatch: AppDispatch
) => {
  const fileToBeUploaded = stringToFile(file, fileName);

  const result = await dispatch(
    uploadFile({
      file: fileToBeUploaded,
      fileName,
      cloud_provider,
      encryption_method,
      file_size,
    })
  );

  if (result.type === "/file,uploadFile/fulfilled") {
    await removeEntryByIdFromDB(id);
  }
  return result;
};

//function that will handle decryption
// Function to handle decryption
export const handleDecrypt = async (
  encryptedFile: any,
  password: string,
  dispatch: AppDispatch,
  deleteFromServer: boolean = false
) => {
  console.log(encryptedFile);
  let encryptionMethod = encryptedFile.encryption_method;
  let decryptedContent;
  try {
    if (encryptedFile) {
      if (encryptionMethod === "blowfish") {
        decryptedContent = CryptoJS.Blowfish.decrypt(
          encryptedFile.encrypted_string,
          password
        ).toString(CryptoJS.enc.Utf8);
      } else if (encryptionMethod === "aes") {
        decryptedContent = CryptoJS.AES.decrypt(
          encryptedFile.encrypted_string,
          password
        ).toString(CryptoJS.enc.Utf8);
      } else {
        decryptedContent = CryptoJS.DES.decrypt(
          encryptedFile.encrypted_string,
          password
        ).toString(CryptoJS.enc.Utf8);
      }

      if (decryptedContent.length === 0) {
        toast.error("Incorrect decryption key", {
          position: "top-right", // Adjust position if needed
        });
        return;
      }

      //get the extension of the file
      const fileExtension = determineFileType(encryptedFile.file_name);

      const theOriginalFile = changeBlobToFile(
        new Blob([decryptedContent]),
        fileExtension,
        encryptedFile.file_name
      );

      const downloadFile = (blob: any, filename: any) => {
        // Create a temporary anchor element
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";

        // Set the URL of the blob as the anchor's href
        const url = window.URL.createObjectURL(blob);
        a.href = url;

        // Set the filename for the download
        a.download = filename;

        // Simulate a click on the anchor to trigger the download
        a.click();

        // Clean up by removing the anchor and revoking the URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      };

      // Usage example:
      if (decryptedContent.length !== 0) {
        downloadFile(theOriginalFile, encryptedFile.file_name);
      }

      //TODO -delete file from server

      if (deleteFromServer) {
        dispatch(deleteFile(encryptedFile.id));
      }

      //TODO - we will fist check if the file is in the indexDB, delete that file then - save the ordinary file in the indexedDB
      await removeEntryByIdFromDB(encryptedFile.id);

      const tempFile: FileThatHaveNotBeenUploaded = {
        file_name: encryptedFile.file_name,
        file_size: encryptedFile.file_size,
        created_at: Date.now(),
        action: "encrypt",
        encryption_method: encryptedFile.encryption_method,
        cloud_provider: encryptedFile.cloud_provider,
        file: theOriginalFile,
      };

      return tempFile;
    }
  } catch (error) {
    console.log(error);
    toast.error("Incorrect decryption key", {
      position: "top-right", // Adjust position if needed
    });
  }
};

export const handleEncrypt = async (
  id: number,
  fileName: string,
  password: string
) => {
  const files: any = await getDataFromDBByNameAndId(fileName, id); // Assuming you have a function to retrieve file from IndexedDB by name

  console.log(id, fileName);

  const file = files[0];

  console.log(file);

  const encryptedString = await handleEncryption(
    file.file,
    password,
    file.encryption_method
  );

  // const encryptedFile = stringToFile(encryptedString, fileName);

  await removeEntryByIdFromDB(file.id);

  const tempFile: FileThatHaveNotBeenUploaded = {
    file_name: file.file_name,
    file_size: file.file_size,
    created_at: Date.now(),
    action: "decrypt",
    encryption_method: file.encryption_method,
    cloud_provider: file.cloud_provider,
    encrypted_string: encryptedString,
  };

  return tempFile;
};
