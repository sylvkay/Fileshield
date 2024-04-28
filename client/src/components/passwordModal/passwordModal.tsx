//style imports
import {
  PasswordModalContainer,
  PasswordModalInner,
} from "./passwordModal.styled";

//component imports
import InputField from "../inputField/inputField.tsx";

const PasswordModal = ({
  setFileState,
  fileState,
  setPasswordModal,

  setIsLoading,
}: any) => {
  return (
    <PasswordModalContainer>
      <PasswordModalInner>
        <div className="password-input-container">
          <InputField
            type="password"
            name="password"
            value={fileState.encryptionPassword}
            onChange={(e: any) =>
              setFileState((prevState: any) => ({
                ...prevState,
                encryptionPassword: e.target.value,
              }))
            }
            label="Password"
            placeholder="Enter your preffered encrytion password for this file"
            shouldValidate
          />
        </div>
        <div className="password-button-container">
          <button onClick={() => setPasswordModal(false)}>Cancel</button>
          <button
            onClick={() => {
              if (fileState.encryptionPassword.length > 0) {
                setPasswordModal(false);
                setIsLoading(true);
              }
            }}
          >
            Encrypt
          </button>
        </div>
      </PasswordModalInner>
    </PasswordModalContainer>
  );
};

export default PasswordModal;
