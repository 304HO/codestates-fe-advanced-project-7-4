import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import authApi from "../apis/api/auth";
import Google from "../assets/images/btn_google_signin_light_normal_web@2x.png";
// import { userLogin } from "../features/userActions";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { OAUTH_URL } from "../common/constants";
import { userLogin } from "../features/userActions";

function Login() {
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { id, password } = inputs;

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickhandler = () => {
    dispatch(userLogin({ id, password }));
  };

  const onClickGoogle = () => {
    window.location.assign(OAUTH_URL);
  };

  return (
    <>
      <Input name="id" placeholder="id" onChange={onChange} value={id} />
      <Input
        name="password"
        placeholder="PASSWORD"
        onChange={onChange}
        value={password}
      />
      {/* <ButtonLogin onClick={onClickhandler}>로그인</ButtonLogin> */}
      {errorMessage === "" ? null : errorMessage}
    </>
  );
}

const Input = styled.input`
  width: 300px;
  height: 50px;
`;
const ButtonLogin = styled.button`
  width: 300px;
  height: 50px;
  background-color: rgb(255, 83, 85);
  color: white;
`;

const ButtonGoogleLogin = styled.button`
  width: 300px;
  height: 50px;
  background-color: white;
  font-weight: bold;
  color: rgb(117, 117, 117);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Img = styled.img`
  width: 310px;
  height: 70px;
`;

export default Login;
