import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatView from "../components/chat/ChatView";
import { useAppSelector } from "../redux/store";

export default function NewPage() {
  const [chatId, setChatId] = useState<string>();

  const newChatId = useAppSelector((state) => state.chats.newChatId);
  const navigate = useNavigate();

  useEffect(() => {
    if (newChatId && newChatId === chatId) {
      navigate(`/chat/${newChatId}`);
    } else {
      setChatId(nanoid());
    }
  }, [newChatId]);

  if (!chatId) return null;

  return <ChatView chat={{ id: chatId, model: "" }} isNewChat={true} />;
}
