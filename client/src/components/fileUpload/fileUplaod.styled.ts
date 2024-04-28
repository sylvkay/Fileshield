import { Link } from "react-router-dom";
import styled from "styled-components";

export const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 0.5em;

  position: relative;

  .file-upload-modal-container {
    width: 100%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 50000000000000000000000000;
  }
`;

export const FileUploadUpper = styled(Link)`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  align-items: center;

  cursor: pointer;

  span {
    font-size: 0.9em;
  }
`;

export const FileUploadContent = styled.div`
  margin: auto;
  padding: 2em;
  width: 100%;

  border: 1px solid var(--outline-color);
  border-radius: 36px;

  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;

  .upload-files-text {
    font-size: 1.5em;
    font-weight: 700;
  }
`;

export const FileUploadContentUpper = styled.div`
  width: 100%;

  .select-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media screen and (max-width: 600px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export const FileUploadInputContainer = styled.div`
  border: 1px dashed black;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
  padding-inline: 4em;
  height: 9em;
  width: 20em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    font-size: 0.9em;
    text-align: center;
  }

  span {
    font-weight: bold;
    font-size: 0.85em;
  }
`;

export const FileButtonsContainer = styled.div`
  margin-top: 2.5em;

  display: flex;
  flex-direction: row;
  gap: 5em;

  button {
    height: 2.45rem;
    width: 7rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;
    font-size: 0.9em;

    cursor: pointer;
  }

  .cancel-button {
    border: 1px solid black;
  }

  .upload-button {
    background-color: black;
    color: white;
  }
`;
