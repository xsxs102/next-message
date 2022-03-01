import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function login() {
  // 登录
  const sighIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="/logo.png" />
        <Button onClick={sighIn}>Sign in with Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default login;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 50px;
`;
