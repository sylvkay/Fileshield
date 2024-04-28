import styled from "styled-components";

export const DashboardContainer = styled.div`
  height: 100%;
  border: 1px solid var(--outline-color);
  padding: 1.5rem 0;
  border-radius: 36px;

  @media screen and (max-width: 450px) {
    border-radius: 15px;
  }
`;

export const DashboardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  padding: 0 1.5em 1.5em 1.5em;
  border-bottom: 1px solid var(--outline-color);

  .big-text {
    font-size: 1.3em;
    font-weight: bold;
  }

  .small-text {
    font-size: 0.8em;
  }
`;
export const DashbaordBottom = styled.div`
  overflow-x: auto;

  height: 100%;
  padding: 1.5em 1em;
`;

export const DashboardTableHeader = styled.div`
  margin-bottom: 1em;

  ul {
    display: grid;
    grid-template-columns:
      minmax(200px, 3.5fr) minmax(70px, 1fr) minmax(90px, 2fr)
      minmax(70px, 1fr) minmax(70px, 1fr);
    gap: 1.5em;

    li {
      color: var(--secondary-text-color);
      cursor: pointer;

      @media screen and (max-width: 700px) {
        font-size: 0.8em;
      }
    }
  }
`;

export const DashboardTableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;

  .table-indicator {
    font-size: 0.9em;
    font-weight: bold;
  }
`;
