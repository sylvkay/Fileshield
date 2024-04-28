import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background-color: var(--hover-color);
`;

export const SignupForm = styled.div`
  width: min(500px, 90%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;

  background-color: #ffffff;
  border-radius: 36px;
  padding: 2rem 3rem;

  @media screen and (max-width: 534px) {
    padding: 2rem 1rem;
    border-radius: 16px;
  }

  span {
    font-size: 1.1em;
    font-weight: 600;
  }

  form {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 1.5em;

    .forgot-password {
      width: 100%;

      display: flex;

      span {
        margin-left: auto;

        font-size: 0.75em;
        font-weight: 300;

        cursor: pointer;
      }
    }
    button {
      padding: 0.7em 0;
      text-align: center;

      background-color: black;

      color: var(--white);

      border-radius: 0.5rem;
      cursor: pointer;
    }
  }

  .dont-have-an-account-text {
    font-size: 0.8em;
    font-weight: 300;

    span {
      font-size: 0.9em;
      font-weight: 400;
      cursor: pointer;
    }
  }
`;
