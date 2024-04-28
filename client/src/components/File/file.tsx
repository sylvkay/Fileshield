//importing types
import { FileType } from "@/utils/types";

//importing styles from styled filel
import { FileContainer } from "./file.styled";

//importing icons
import FileIcon from "../../assets/File (1).png";
import CloudIcon from "../../assets/upload-icon.png";

//importing functions from helper.js
import {
  downloadEncryptedOrDecryptedFile,
  formatDate,
  getDataFromDBByNameAndId,
  uploadFileToCloudAndRemoveFromIndexDB,
} from "@/utils/helpers";

//imports from react-redux
import { useDispatch } from "react-redux";

//action imports from file slice
import {
  getFile,
  getUserFiles,
  setFileToBeDecrypted,
} from "@/redux/slices/fileSlice";

//imports from redux store
import { AppDispatch } from "@/redux/store";

//imports from react-router-dom
import { useNavigate } from "react-router-dom";

//imports from react-toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling

//declaration
const File = ({
  file_name,
  file_size,
  created_at,
  id,
  action = "decrypt",
  cloud_provider,
  encryption_method,
  encrypted_string,

  hasBeenUploadedToCloud = true,
}: FileType) => {
  //declaring dispatch and navigati

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //function sets intended file in state, then navigates
  const handleEncryptOrDecrypt = async () => {
    if (action === "decrypt") {
      dispatch(
        setFileToBeDecrypted({
          file_name: file_name,
          file_size: file_size,
          created_at: created_at,
          id: id,
          cloud_provider,
          encryption_method,
        })
      );

      if (hasBeenUploadedToCloud) {
        navigate("/decryption-encryption/decrypt/true");
      } else {
        navigate("/decryption-encryption/decrypt/false");
      }
    } else {
      dispatch(
        setFileToBeDecrypted({
          file_name: file_name,
          file_size: file_size,
          created_at: created_at,
          id: id,
          cloud_provider,
          encrypted_string,
          encryption_method,
        })
      );
      navigate("/decryption-encryption/encrypt/false");
    }
  };

  //function that handles the downlaod of file
  const handleDownload = async () => {
    const result = await downloadEncryptedOrDecryptedFile(
      action,
      file_name,
      id,
      dispatch
    );
    return result;
  };

  //function that handles the upload of file to cliud using the image
  const handleUploadToCloud = async () => {
    const files = await getDataFromDBByNameAndId(file_name, id);

    const fileToBeDecrypted = files[0];

    const result = await uploadFileToCloudAndRemoveFromIndexDB(
      fileToBeDecrypted.encrypted_string,
      fileToBeDecrypted.file_name,
      fileToBeDecrypted.cloud_provider,
      fileToBeDecrypted.encryption_method,
      fileToBeDecrypted.file_size,
      fileToBeDecrypted.id,
      dispatch
    );

    console.log(result);

    if (result.type === "/file,uploadFile/fulfilled") {
      toast.success("Uploaded to cloud successfully", {
        position: "top-right", // Adjust position if needed
      });
      dispatch(getUserFiles());
    }
  };

  return (
    <FileContainer>
      <div className="file-name">
        {action === "decrypt" && !hasBeenUploadedToCloud ? (
          <img
            src={CloudIcon}
            className="cloud-icon"
            alt="Cloud Icon"
            onClick={handleUploadToCloud}
          />
        ) : (
          <></>
        )}
        <img src={FileIcon} alt="File Icon" />
        <span>{file_name}</span>
      </div>
      <span className="file-size">{file_size}</span>
      <span className="date-uploaded">{formatDate(created_at)}</span>
      <span className="action" onClick={handleEncryptOrDecrypt}>
        {action}
      </span>
      <span className="download-button" onClick={handleDownload}>
        Download
      </span>
    </FileContainer>
  );
};

export default File;
