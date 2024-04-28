//react imorts
import { useCallback, useEffect, useState } from "react";

//react-dropzone imports
import { useDropzone } from "react-dropzone";

//react-router-dom-imports
import { useNavigate } from "react-router-dom";

//imports from store
import { AppDispatch } from "@/redux/store";

//imports from react selct
import Select from "react-select";

//importing styles froms styled file
import {
  FileButtonsContainer,
  FileUploadContainer,
  FileUploadContent,
  FileUploadContentUpper,
  FileUploadInputContainer,
  FileUploadUpper,
} from "./fileUplaod.styled";

//importing icons from assets
import ArrowLeftIcon from "../../assets/arrow-left.png";
import FolderIcon from "../../assets/folder.png";
import FileUploadModal from "../fileUploadModal/fileUploadModal";

//imports from react-redux
import { useDispatch } from "react-redux";

//import actions from file slice
import {
  removeUploadedFileFromState,
  uploadFile,
} from "@/redux/slices/fileSlice";

//importing functions from helper.js
import {
  blobToFile,
  customStyles,
  handleEncryption,
  stringToBlob,
} from "@/utils/helpers";

//type imports
import { Options } from "@/utils/types";

//component imports
import PasswordModal from "../passwordModal/passwordModal";

//custom hooks imports
import UseFileHook from "@/hooks/useFileUpload";

const options: Options[] = [
  { value: "blowfish", label: "Blow Fish" },
  { value: "aes", label: "AES" },
  { value: "des", label: "DES" },
  // { value: "sha256", label: "sha256" },
];

const providerOptions: Options[] = [
  { value: "aws", label: "AWS" },
  { value: "firebase", label: "Firebase" },
];

const FileUpload = () => {
  //setting the custom hook
  const { setFile } = UseFileHook();

  //navigate and dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //remove uplaodedFile from state
    dispatch(removeUploadedFileFromState());
  }, []);

  //file state
  const [fileState, setFileState] = useState({
    acceptedFile: null as File | null,
    acceptedFileName: null as string | null,
    cloudProvider: null as string | null,
    encryptionMethod: null as string | null,
    encryptedString: null as string | null,
    fileToBeUploaded: null as any,
    fileSize: null as string | null,
    encryptionPassword: "" as string,
  });

  //modals hooks
  const [isLoading, setIsLoading] = useState(false);
  const [passwordModal, setPasswordModal] = useState<boolean>(false);

  //useEffect hook to make sure the file uploads only if a file has been uplaoded
  useEffect(() => {
    if (
      !fileState.acceptedFile ||
      !fileState.encryptionMethod ||
      fileState.encryptionPassword.length < 1
    ) {
      return;
    }
    handleEncrypt();
  }, [
    fileState.acceptedFile,
    fileState.encryptionMethod,
    fileState.encryptionPassword,
  ]);

  //function that stores the file in the indexed db, the file will be encrypted before

  const storeInIndexedDB = () => {
    handleEncrypt();
    //FIXME ADD A BETTER COMMENT HERE
    const tempfile = {
      file_name: fileState.acceptedFileName,
      created_at: Date.now(),
      file_size: fileState.fileSize,
      action: "decrypt",
      encryption_method: fileState.encryptionMethod,
      encrypted_string: fileState.encryptedString,
      cloud_provider: fileState.cloudProvider,
    };

    setFile(tempfile);
  };

  //useEffect hoook that converts the accepted file to blob, then a txt file, and then checks the size of the file
  useEffect(() => {
    if (fileState.acceptedFileName && fileState.encryptedString) {
      const blob = stringToBlob(fileState.encryptedString);

      const fileSizeInBytes = blob.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      setFileState((prevState: any) => ({
        ...prevState,
        fileSize: fileSizeInKB.toFixed(2) + " KB",
      }));

      const convertedFile = blobToFile(blob, fileState.acceptedFileName);

      setFileState((prevState: any) => ({
        ...prevState,
        fileToBeUploaded: convertedFile,
      }));
    }
  }, [fileState.acceptedFileName, fileState.encryptedString]);

  //react dropzone config
  const onDrop = useCallback((acceptedFiles: any) => {
    //sets the file to the state hook

    setFileState((prevState: any) => ({
      ...prevState,
      acceptedFile: acceptedFiles[0],
    }));

    setFileState((prevState: any) => ({
      ...prevState,
      acceptedFileName: acceptedFiles[0].name,
    }));
  }, []);

  //react dropzone config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  //code for the encryption
  const handleEncrypt = async () => {
    const encrypted = await handleEncryption(
      fileState.acceptedFile,
      fileState.encryptionPassword,
      fileState.encryptionMethod
    );

    setFileState((prevState: any) => ({
      ...prevState,
      encryptedString: encrypted,
    }));
  };

  //function dispatching API function
  const onEncrypt = () => {
    if (
      !fileState.cloudProvider ||
      !fileState.encryptionMethod ||
      !fileState.fileToBeUploaded ||
      !fileState.acceptedFileName
    ) {
      return;
    }
    //open and close modals respectively
    setPasswordModal(false);
    setIsLoading(true);

    //dispatchign action
    dispatch(
      uploadFile({
        file: fileState.fileToBeUploaded,
        fileName: fileState.acceptedFileName,
        cloud_provider: fileState.cloudProvider,
        encryption_method: fileState.encryptionMethod,
        file_size: fileState.fileSize,
      })
    );
  };

  //makes sure the password modal doesnt open if all the fields are not filled yet
  const onOpenPasswordModal = () => {
    if (
      !fileState.cloudProvider ||
      !fileState.encryptionMethod ||
      !fileState.acceptedFileName
    ) {
      return;
    }
    setPasswordModal(true);
  };

  return (
    <FileUploadContainer>
      <div
        className="file-upload-modal-container"
        style={passwordModal ? { height: "100%" } : {}}
      >
        {isLoading && (
          <FileUploadModal
            onEncrypt={onEncrypt}
            storeInIndexedDB={storeInIndexedDB}
          />
        )}
        {passwordModal && (
          <PasswordModal
            setFileState={setFileState}
            fileState={fileState}
            setPasswordModal={setPasswordModal}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
      <FileUploadUpper to="/">
        <img src={ArrowLeftIcon} alt="Back" />
        <span>Back to overview</span>
      </FileUploadUpper>

      <FileUploadContent>
        <FileUploadContentUpper>
          <div className="select-container">
            <Select
              styles={customStyles}
              options={providerOptions}
              placeholder="Select preferred provider"
              onChange={(selectedOption) =>
                setFileState((prevState: any) => ({
                  ...prevState,
                  cloudProvider: selectedOption ? selectedOption.value : null,
                }))
              } // Set cloud_provider state inline
            />
            <Select
              styles={customStyles}
              options={options}
              placeholder="Select encryption method"
              onChange={(selectedOption) =>
                setFileState((prevState: any) => ({
                  ...prevState,
                  encryptionMethod: selectedOption
                    ? selectedOption.value
                    : null,
                }))
              } // Set cloud_provider state inline
            />
          </div>
        </FileUploadContentUpper>
        <span className="upload-files-text">Upload Files</span>

        <FileUploadInputContainer {...getRootProps()}>
          {!fileState.acceptedFile ? (
            <>
              <input {...getInputProps()} />
              <img src={FolderIcon} alt="Folder" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop files here or browse </p>
              )}
            </>
          ) : (
            <>
              <p>{fileState.acceptedFileName}</p>
              <span
                onClick={() =>
                  setFileState((prevState: any) => ({
                    ...prevState,
                    acceptedFile: null,
                  }))
                }
              >
                Remove File
              </span>
            </>
          )}
        </FileUploadInputContainer>

        <FileButtonsContainer>
          <button className="cancel-button" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button className="upload-button" onClick={onOpenPasswordModal}>
            Upload File
          </button>
        </FileButtonsContainer>
      </FileUploadContent>
    </FileUploadContainer>
  );
};

export default FileUpload;
