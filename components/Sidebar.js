import React from "react";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

import { Avatar, IconButton, Button } from "@mui/material";
import { Chat, MoreVert, Search } from "@mui/icons-material";
import ChatItem from "../components/ChatItem";

function Sidebar() {
  // 获取用户
  const [user] = useAuthState(auth);

  // 获取当前用户的所有chats
  const [chatSnapshot] = useCollection(
    query(collection(db, "chats"), where("users", "array-contains", user.email))
  );

  // 生成新chat
  const createChat = () => {
    const input = prompt("输入用户邮箱地址进行聊天");
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  // 验证chat是否存在
  const chatAlreadyExists = recipientEmail =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === recipientEmail)?.length > 0
    );
    
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconContainer>
      </Header>

      <SearchContainer>
        <Search />
        <SearchInput placeholder="Search" />
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>

      {/* Chat List */}
      {chatSnapshot?.docs.map(chat => (
        <ChatItem key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  border-right: 1px solid whitesmoke;
  overflow-y: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``;

const SearchContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
