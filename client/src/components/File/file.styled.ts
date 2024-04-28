//importing styled from styled-components
import styled from "styled-components";

export const FileContainer = styled.div`
  display: grid;
  gap: 1.5em;
  grid-template-columns:
    minmax(200px, 3.5fr) minmax(70px, 1fr) minmax(90px, 2fr)
    minmax(70px, 1fr) minmax(70px, 1fr);

  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;

    span {
      font-size: 0.95em;

      max-width: 100%;
      @media screen and (max-width: 700px) {
        font-size: 0.8em;
      }
    }
  }
  .action {
    cursor: pointer;
  }
  span {
    font-size: 0.95em;
    font-weight: 300;

    @media screen and (max-width: 700px) {
      font-size: 0.8em;
    }
  }

  span:last-child {
    cursor: pointer;
  }

  .download-button {
    cursor: pointer;
    color: #3e3e3e;
  }

  .cloud-icon {
    cursor: pointer;
  }
`;
