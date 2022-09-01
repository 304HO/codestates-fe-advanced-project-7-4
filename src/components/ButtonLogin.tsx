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
  min-width: 88px;
  height: 40px;
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;

  background: #00e87b;
  box-shadow: 1px 2px 1px #cdcacf;
  border-radius: 50px;
  border: none;
  user-select: none;
`;

export default ButtonLogin;
