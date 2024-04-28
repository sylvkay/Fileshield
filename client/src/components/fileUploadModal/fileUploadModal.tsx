//imports from react
import { useEffect, useState } from "react";

//imports from reacr-router-dom
import { useNavigate } from "react-router-dom";

//importing styles from styled file
import {
  FileUploadModalContainer,
  FileUploadModalTop,
  FileUploadModalInner,
  FileUploadProcess,
  ProcessContainer,
  FileUploadModalButton,
  FileUploadModalButtonContainer,
  LoadingComponentContainer,
} from "./fileUploadModal.styled";

//react-redux imports
import { useSelector } from "react-redux";

//imports from redux-store
import { RootState } from "@/redux/store";

//imports from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { toast } from "react-toastify";

//custom hooks import
import useProgressiveIncrease from "@/hooks/useProgressiveIncreaseHook";

//declaration
const FileUploadModal = ({ onEncrypt, storeInIndexedDB }: any) => {
  //get the uplaoded file from state to create laoding functionaloty
  const uplaodedFile = useSelector(
    (state: RootState) => state.file.uploadedFile
  );

  //sets the loading onto the cloud
  const [cloudLoading, setCloudLoading] = useState(false);

  //check if the uploaded file is, then set the laoding accordingly
  useEffect(() => {
    if (uplaodedFile) {
      setCloudLoading(false);
      navigate("/");
      toast.success("Uploaded to cloud successfully", {
        position: "top-right", // Adjust position if needed
      });
    }
  }, [uplaodedFile]);

  //method to handle the encryption
  const handleEncryption = () => {
    setCloudLoading(true);
    onEncrypt();
  };

  const duration = 1; // Set to whatever you like or make it dynamic
  const encryptionProgress = useProgressiveIncrease(
    0,
    duration,
    duration / 100
  );
  const awsIntroProgress = useProgressiveIncrease(
    duration / 2,
    duration,
    duration / 100
  );

  //decalring navigate
  const navigate = useNavigate();

  //onCancel function, that runs when user presses the cancel button
  const onCancel = () => {
    navigate("/");
  };

  return (
    <FileUploadModalContainer>
      {cloudLoading ? (
        <LoadingComponent />
      ) : (
        <FileUploadModalInner>
          <FileUploadModalTop>
            <span>Files Uploading</span>
          </FileUploadModalTop>

          <FileUploadProcess>
            <ProcessContainer>
              <div className="process">
                <span>Encryption Process</span>
                <div>
                  <span>{encryptionProgress}%</span>
                  {encryptionProgress === 100 && <span>Encrypted</span>}
                </div>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${encryptionProgress}%` }}
                ></div>
              </div>
            </ProcessContainer>
            <ProcessContainer>
              <div className="process">
                <span>AWS Introduction</span>
                <div>
                  <span>{awsIntroProgress}%</span>
                  {awsIntroProgress !== 100 ? (
                    <button>Encrypt file</button>
                  ) : (
                    <span>Encrypted</span>
                  )}
                </div>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-bar-inner"
                  style={{ width: `${awsIntroProgress}%` }}
                ></div>
              </div>
            </ProcessContainer>
          </FileUploadProcess>

          {awsIntroProgress === 100 && encryptionProgress === 100 ? (
            <FileUploadModalButtonContainer>
              <button className="cancel-button" onClick={storeInIndexedDB}>
                local Host
              </button>
              <button className="upload-button" onClick={handleEncryption}>
                Store to cloud
              </button>
            </FileUploadModalButtonContainer>
          ) : (
            <FileUploadModalButton onClick={onCancel}>
              Cancel
            </FileUploadModalButton>
          )}
        </FileUploadModalInner>
      )}
    </FileUploadModalContainer>
  );
};

const LoadingComponent = () => {
  return (
    //FIXME - ADD SIMPLE BOX SHADOW
    <LoadingComponentContainer>Uploading to cloud...</LoadingComponentContainer>
  );
};

export default FileUploadModal;
