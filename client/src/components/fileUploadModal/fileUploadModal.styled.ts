import styled from "styled-components";

export const FileUploadModalContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileUploadModalInner = styled.div`
  margin: auto;
  width: min(95%, 600px);
  border-radius: 36px;
  background-color: var(--white);
  outline: 1px solid var(--secondary-text-color);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5em 0 4rem 0;
`;

export const FileUploadModalTop = styled.div`
  padding: 1.5em;
  border-bottom: 1px solid black;
  width: 100%;

  span {
    font-size: 1.2em;
    font-weight: 700;
  }
`;

export const FileUploadProcess = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2em;
  width: 100%;

  @media screen and (max-width: 530px) {
    padding: 0.5em;
    gap: 1em;
  }

  .progress-bar {
    width: 100%;
    height: 0.3em;
    border-radius: 30px;
    background-color: var(--secondary-text-color);
    position: relative;

    .progress-bar-inner {
      height: 100%;
      border-radius: 30px;

      position: absolute;
      top: 0;
      left: 0;
      background-color: #a8bdf1;
    }
  }
`;

export const ProcessContainer = styled.div`
  width: 100%;
  .process {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;

    @media screen and (max-width: 530px) {
      padding: 0.5em;
    }
    div {
      display: flex;
      flex-direction: row;
      gap: 1em;
      align-items: center;

      @media screen and (max-width: 530px) {
        gap: 0.5em;
      }

      button {
        background-color: black;
        color: white;
        font-size: 0.65em;
        font-weight: 300;
        padding: 0.4em 0.65em;
        border-radius: 3px;

        cursor: pointer;
      }
    }

    span {
      font-size: 0.75em;
    }
  }
`;

export const FileUploadModalButton = styled.button`
  margin-top: 5em;
  width: 85%;

  border: 1px solid black;
  border-radius: 8px;
  padding: 1em 0;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
`;

export const FileUploadModalButtonContainer = styled.div`
  margin-top: 5em;

  display: flex;
  flex-direction: row;
  gap: 3.5em;

  button {
    height: 2.45rem;
    width: 8rem;

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

export const LoadingComponentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999;
  padding-block: 5em;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 16px;
`;
