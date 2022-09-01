import styled from "styled-components";

function ButtonLogin() {
  return <ButtonContainer>로그인</ButtonContainer>;
}

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 18px 26px; */
  gap: 10px;

  width: 88px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;

  background: #00e87b;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  border: 0px solid;
  user-select: none;
`;

export default ButtonLogin;
