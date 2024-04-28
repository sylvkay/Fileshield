//importing stuff from react
import React, { useState, useEffect } from "react";

//imports from react-redux
import { useDispatch, useSelector } from "react-redux";

//imports from react-router-dom
import { useParams, useNavigate } from "react-router-dom";

//component imports
import InputField from "../inputField/inputField.tsx";

//style imporst
import {
  EncryptionDecryptionContainer,
  EncryptionDecryptionInnerContainer,
} from "./encryptionDecryption.styled";

//imports from store
import { AppDispatch, RootState } from "@/redux/store.ts";
import {
  getFile,
  removeEncryptedFileFromState,
} from "@/redux/slices/fileSlice.ts";

//imports from helper.js
import {
  checkIfDataIsInIndexedDB,
  getDataFromDBByNameAndId,
  getFirst25Characters,
  handleDecrypt,
  handleEncrypt,
  uploadFileToCloudAndRemoveFromIndexDB,
} from "@/utils/helpers.ts";

//custom hooks imports
import UseFileHook from "@/hooks/useFileUpload.ts";

//import from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

//image imports
import cloudIcon from "../../assets/upload-icon.png";

// Declaration
const EncryptionDecryption = () => {
  // Declaring status from useParams
  const { status, hasBeenUploadedToCloud } = useParams();

  //colelctin setFile from custom file hook
  const { setFile } = UseFileHook();

  // Declaring dispatch
  const dispatch = useDispatch<AppDispatch>();

  // State management for the password
  const [password, setPassword] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const [isDecryptButtonDisabled, setIsDecryptButtonDisbled] = useState(true);

  const [fileIsInIndexedDB, setFileInIndexedDB] = useState<boolean>(false);

  const [fileFromIndexedDB, setFileFromIndexedDB] = useState<any>(null);

  // Get decrypted file from server
  const encryptedFile = useSelector(
    (state: RootState) => state.file.encryptedFile
  );

  // Checks if fileToBeDecryptedExists in state
  const fileToBeDecrypted = useSelector(
    (state: RootState) => state.file.fileToBeDecrypted
  );

  // Function to get file from server or indexed db
  const geFileFromServerOrIndexedDB = async () => {
    if (hasBeenUploadedToCloud) {
      await dispatch(getFile(fileToBeDecrypted.id));
    } else {
      const foundInIndexedDB = await getDataFromDBByNameAndId(
        fileToBeDecrypted.file_name,
        fileToBeDecrypted.id
      );

      if (foundInIndexedDB.length > 0) {
        setFileFromIndexedDB(foundInIndexedDB[0]);
      }
    }
  };

  // Function to handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //handle decryption function
  const handleDecryption = async () => {
    if (hasBeenUploadedToCloud) {
      const tempFile = await handleDecrypt(
        encryptedFile,
        password,
        dispatch,
        true
      );
      setFile(tempFile);
    } else {
      const tempFile = await handleDecrypt(
        fileFromIndexedDB,
        password,
        dispatch
      );
      setFile(tempFile);
    }
  };

  useEffect(() => {
    if (status === "encrypt") {
      setIsDecryptButtonDisbled(false);
    } else {
      if (encryptedFile || fileFromIndexedDB) {
        setIsDecryptButtonDisbled(false);
      }
    }
  }, [encryptedFile, fileFromIndexedDB]);

  //handle encryption function
  const handleEncryption = async () => {
    const tempFile = await handleEncrypt(
      fileToBeDecrypted.id,
      fileToBeDecrypted.file_name,
      password
    );

    setFile(tempFile);
  };

  const checkFileInIndexedDB = async () => {
    const result = await checkIfDataIsInIndexedDB(
      fileToBeDecrypted.file_name,
      fileToBeDecrypted.id
    );

    setFileInIndexedDB(result);
  };

  //fetch the corresponding files from the servefr
  useEffect(() => {
    checkFileInIndexedDB();

    if (fileToBeDecrypted) {
      geFileFromServerOrIndexedDB();
    }
  }, []);

  const navigate = useNavigate();

  //function that uploads to cloud if it hasnt already been uplaoded
  const uploadToCloud = async () => {
    setLoadingState(true);

    const result = await uploadFileToCloudAndRemoveFromIndexDB(
      fileToBeDecrypted.encrypted_string,
      fileToBeDecrypted.file_name,
      fileToBeDecrypted.cloud_provider,
      fileToBeDecrypted.encryption_method,
      fileToBeDecrypted.file_size,
      fileToBeDecrypted.id,
      dispatch
    );

    if (result) {
      setLoadingState(false);
      toast.success("Uploaded to cloud successfully", {
        position: "top-right", // Adjust position if needed
      });
      navigate("/");
    }
  };

  return (
    <EncryptionDecryptionContainer>
      <div className="encryption-decryption-top">
        <h1>Decryption</h1>

        {fileIsInIndexedDB ? (
          <span onClick={uploadToCloud}>
            {status === "decrypt" ? (
              loadingState ? (
                <span>Loading . . . .</span>
              ) : (
                <div className="upload-button">
                  <img src={cloudIcon} alt="Cloud" />
                  <span>Upload to cloud</span>
                </div>
              )
            ) : null}
          </span>
        ) : (
          <></>
        )}
      </div>

      <EncryptionDecryptionInnerContainer>
        <span>Enter your password to decrypt this file</span>

        <InputField
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          label="Password"
          shouldValidate
          placeholder={`Enter password to decrypt file - ${getFirst25Characters(
            fileToBeDecrypted?.file_name
          )}`}
        />

        <button
          disabled={!fileToBeDecrypted || isDecryptButtonDisabled}
          onClick={status === "encrypt" ? handleEncryption : handleDecryption}
        >
          {status}
        </button>
      </EncryptionDecryptionInnerContainer>
    </EncryptionDecryptionContainer>
  );
};

export default EncryptionDecryption;
