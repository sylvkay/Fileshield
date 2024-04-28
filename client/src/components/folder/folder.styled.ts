import styled from "styled-components";

export const FolderContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  border-radius: 16px;
  transition: 0.2s all ease-in-out;

  border: 1px solid var(--outline-color);

  .folder-middle {
    font-size: 1rem;
    font-weight: 500;
    transition: 0.2s all ease-in-out;
  }

  &:hover {
    background-color: var(--fill-color);

    .folder-middle {
      color: var(--white);
    }

    .folder-bottom-span {
      color: var(--white);
    }
  }
`;

export const FolderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  .folder-file-img {
    height: 3rem;
  }

  .folder-options {
    cursor: pointer;
  }
`;

export const FolderBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-size: 0.85rem;
    font-weight: 300;

    transition: 0.2s all ease-in-out;
  }
`;
