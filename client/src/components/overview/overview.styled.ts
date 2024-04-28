import styled from "styled-components";

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1em;
`;

export const OverviewTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  span {
    font-weight: 500;
    font-size: 0.9em;
  }
`;

export const OverviewTopFolders = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  margin-top: 1rem;

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewBottom = styled.div`
  margin-top: 2em;
`;
