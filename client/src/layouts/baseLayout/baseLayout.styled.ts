import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;

  position: relative;
`;

export const LayoutLeft = styled.div`
  width: 18em;

  position: fixed;
  top: 0;
  left: 0;

  transition: 0.2s all ease-in-out;

  z-index: 5000000000000000000000000000;

  @media screen and (max-width: 867px) {
    position: absolute;
    background-color: white;
  }
`;

export const LayoutRight = styled.div`
  height: 100vh;
  min-width: calc(100% - 18em);

  margin-left: 18rem;

  display: flex;
  flex-direction: column;

  padding: 2.2em;

  @media screen and (max-width: 867px) {
    margin-left: 0;
  }
  @media screen and (max-width: 450px) {
    padding: 1.2em;
  }

  .menu-icon {
    height: 2em;
    margin-bottom: 1em;
    max-width: fit-content;

    display: none;
    cursor: pointer;

    @media screen and (max-width: 867px) {
      display: block;
    }
  }

  .layout-outlet {
    flex: 1;
  }
`;

export const LayoutHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 2.75em;
  margin-bottom: 3.5em;
`;

export const LayoutHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;

  .big-text {
    font-weight: 400;
    letter-spacing: 1px;
  }

  .small-text {
    font-weight: 300;
    font-size: 0.75em;
  }
`;

export const LayoutHeaderCenter = styled.div`
  flex: 1;

  max-width: 50%;

  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  justify-content: left;
  align-items: center;

  position: relative;

  background-color: var(--outline-color);
  border-radius: 60px;

  height: 100%;

  @media screen and (max-width: 969px) {
    display: none;
  }

  input {
    width: 100%;
    height: 100%;

    font-size: 0.87em;
    padding-left: 3.5em;
    /* text-align: center; */

    &::placeholder {
      color: var(
        --secodnary-text-color
      ); /* Change the color of the placeholder text */
      font-weight: 500;
    }
  }

  img {
    position: absolute;
    left: 5%;
    scale: 0.9;
  }
`;

export const LayoutHeaderRight = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 1.5rem;

  .notification {
    height: 100%;
    width: 2.7em;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: var(--hover-color);

    border-radius: 100%;

    cursor: pointer;
  }
  img {
    cursor: pointer;
    scale: 0.9;
  }
`;
