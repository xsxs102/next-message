import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>{message.timestamp ? moment(message.timestamp).format("LT") : "..."}</Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  padding-bottom: 30px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
  & > span {
    text-align: right;
    right: 0;
  }
`;

const Reciever = styled(MessageElement)`
  background-color: white;
  text-align: left;
  & > span {
    text-align: left;
    left: 0;
  }
`;

const Timestamp = styled.span`
  color: gray;
  padding: 8px;
  font-size: 6px;
  position: absolute;
  bottom: 0;
`;
