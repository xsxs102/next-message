import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

function Chat({ chat }) {
  // console.log(chat)
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

// getServerSideProps用firebase API报错500 问题未知
// export async function getServerSideProps(context) {
  // const ref = doc(db, "chats", router.query.id);

  // 对话内容
  // const q = query(collection(ref, "messages"), orderBy("timestamp", "asc"));
  // const messagesRes = await getDocs(q);
  // const messages = messagesRes.docs
  //   .map(doc => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }))
  //   .map(messages => ({
  //     ...messages,
  //     timestamp: messages.timestamp.toDate().getTime(),
  //   }));

  // // 对话属性
  // getDoc(doc(db, "chats", router.query.id))
  // const chat = await getDoc(doc(db, "chats", context.query.id));

  // console.log(message);
//   return {
//     props: {
//       // chat:chat
//     },
//   };
// }

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
