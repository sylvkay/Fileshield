import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  padding: 2rem 1rem 5.5rem 1rem;

  height: 100dvh;

  border-right: 1px solid var(--outline-color);

  .main-menu-text {
    display: block;

    margin-bottom: 0.5rem;

    font-weight: 400;
    font-size: 0.9rem;
  }
`;

export const SideBarTop = styled.div`
  margin-bottom: 2rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  img {
    display: none;
    cursor: pointer;

    @media screen and (max-width: 867px) {
      display: block;
    }
  }
`;

export const SidebarTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
`;
export const SidebarNav = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const SidebarTopLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const SidebarLink = styled(Link)`
  li {
    width: 100%;
    height: 2.8em;

    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;


    padding: 0 1rem;

    border-radius: 8px;

    cursor: pointer;

    transition: 0.2s all ease-in-out;

    &:hover {
      background-color: var(--hover-color);
    }

    span {
      margin-block: auto;

      transition: 0.2s all ease-in-out;

      font-size: 0.95em;
    }
  }
`;

export const SidebarNavBottom = styled.div`
  margin-top: auto;
`;

export const SidebarNavBottomLinks = styled.ul`
  margin-top: -2rem;

  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  span {
    margin-bottom: 0.5rem;

    font-weight: 400;
    font-size: 0.9rem;
  }
`;
export const UserPanel = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`;

export const UserPanelLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

export const UserPanelRight = styled.div``;
