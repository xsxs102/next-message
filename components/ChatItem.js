import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getRecipientEmail } from "../utils/user";
import { auth, db } from "../firebase";

import { Avatar } from "@mui/material";

function ChatItem({ id, users }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", getRecipientEmail(users, user)))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? <UserAvatar src={recipient.photoURL} /> : <UserAvatar />}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default ChatItem;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
