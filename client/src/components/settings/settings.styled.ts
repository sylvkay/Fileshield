import styled from "styled-components";

export const SettingsContainer = styled.div`
  height: 100%;

  display: flex;
`;

export const SettingsInnerContainer = styled.div`
  margin: auto;
  padding: 3em;
  width: min(600px, 95%);

  border: 1px solid #e3e3e3;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;

  span {
    font-size: 1.1em;
    text-align: center;
  }

  button {
    background-color: black;
    color: white;
    padding: 0.7em 1.2em;
    border-radius: 5px;
    max-width: fit-content;

    /* font-size: 0.9em; */

    cursor: pointer;
  }
`;

export const SettingsInputContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1em;
`;
