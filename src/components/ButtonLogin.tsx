import { useState } from "react";
import styled from "styled-components";
import { userLogin } from "../features/userActions";
import { logout } from "../features/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import useModal from "../hooks/useModal";
import Modal from "./Modal/Modal";

function ButtonLogin() {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { isOpen, toggle } = useModal();
  const [id, setId] = useState<string>("");
  const onClickLogoutHandler = () => {
    dispatch(userLogin({ id, password }));
    toggle();
  };
  const onClickLoginHandler = () => {
    dispatch(logout());
  };
  const [password, setPassword] = useState<string>("");
  return (
    <>
      {userState.isLogin === false && (
        <ButtonContainer onClick={toggle}>로그인</ButtonContainer>
      )}
      {userState.isLogin === true && (
        <ButtonContainer onClick={onClickLoginHandler}>
          로그아웃
        </ButtonContainer>
      )}
      <Modal open={isOpen} onClose={toggle}>
        <>
          <Input
            placeholder={"id"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></Input>
          <Input
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <StyledButtonLogin onClick={onClickLogoutHandler}>
            로그인
          </StyledButtonLogin>
        </>
      </Modal>
    </>
  );
}

const Input = styled.input`
  width: 300px;
  height: 50px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  padding: 0px 20px 0px 20px;
`;

const StyledButtonLogin = styled.button`
  width: 340px;
  height: 50px;
  border: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: rgb(255, 83, 85);
  color: white;
`;

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
