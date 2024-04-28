import styled from "styled-components";

export const EncryptionDecryptionContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  .encryption-decryption-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .upload-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid black;
      border-radius: 14px;
      padding: 0.5em 1em;
      cursor: pointer;

      span {
        font-size: 0.9em;
      }
    }
  }
`;

export const EncryptionDecryptionInnerContainer = styled.div`
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 0.5em;

  width: min(800px, 90%);

  justify-content: center;
  padding: 1.5em 2em;
  border-radius: 0.5em;
  border: 1px solid var(--outline-color);

  span {
    text-align: center;
    font-weight: 500;
    margin-bottom: 2em;
  }

  button {
    margin-top: 3em;
    margin-inline: auto;

    max-width: fit-content;

    font-size: 0.9em;

    color: var(--white);
    background-color: black;

    padding: 0.7em 1.3em;
    border-radius: 0.5em;

    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
