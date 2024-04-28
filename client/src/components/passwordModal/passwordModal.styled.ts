import styled from "styled-components";

export const PasswordModalContainer = styled.div`
  min-height: 100%;
  width: 100%;
  border-radius: 16px;

  display: flex;

  background-color: rgba(128, 128, 128, 0.2);
`;

export const PasswordModalInner = styled.div`
  margin: auto;
  width: min(95%, 600px);

  border-radius: 36px;
  background-color: var(--white);
  outline: 1px solid var(--secondary-text-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  padding: 3rem;

  .password-input-container {
    width: 100%;
  }
  .password-button-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3rem;

    button {
      /* margin-inline: auto; */

      max-width: fit-content;

      font-size: 0.9em;

      color: var(--white);
      background-color: black;

      padding: 0.7em 1.3em;
      border-radius: 0.5em;

      cursor: pointer;
    }
  }
`;
