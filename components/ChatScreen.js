import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import styled from "styled-components";

import { Avatar, IconButton } from "@mui/material";
import { MoreVert, EmojiEmotionsRounded, MicRounded, SendRounded } from "@mui/icons-material";
import Message from "./Message";

function ChatScreen({ chat, messages }) {
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messageSnapshot] = useCollection(
    query(collection(doc(db, "chats", router.query.id), "messages"), orderBy("timestamp", "asc"))
  );

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{ ...message.data(), timestamp: message.data().timestamp?.toDate().getTime() }}
        />
      ));
    }
    //  else {
    //   return JSON.parse(messages).map(message => (
    //     <Message key={message.id} user={message.user} message={message} />
    //   ));
    // }
  };

  const sendMessage = async e => {
    e.preventDefault();
    await updateDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    await addDoc(collection(doc(db, "chats", router.query.id), "messages"), {
      user: user.email,
      message: input,
      photoURL: user.photoURL,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scrollToBottom();
  };

  // const recipientEmail = getRecipientEmail(chat.users, user);

  const scrollToBottom = () => {
    // 滚动窗口使元素进入视口
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>recipientEmail</h3>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <EmojiEmotionsRounded />
        <Input value={input} onChange={e => setInput(e.target.value)} />
        <MicRounded />
        <IconButton disabled={!input} onClick={e => sendMessage(e)}>
          <SendRounded />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  border-bottom: 1px solid whitesmoke;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 10px;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 10px;
  min-height: 90vh;
  background-color: whitesmoke;
`;

const EndOfMessage = styled.div`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  bottom: 0;
  z-index: 100;
  position: sticky;
  display: flex;
  align-items: center;
  background-color: white;
  border-top-color: 1px solid whitesmoke;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  flex: 1;
  align-items: center;
  padding: 10px;
  margin: 0 10px;
  position: sticky;
  bottom: 0px;
  background-color: whitesmoke;
  outline: 0;
  border-radius: 10px;
`;
