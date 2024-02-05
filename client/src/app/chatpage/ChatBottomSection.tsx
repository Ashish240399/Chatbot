"use client";
import { Button } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "@/redux/hooks";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  setSelectedConversation: Function;
  setConversation: Function;
  setWantToEndConv: Function;
  handleChange: Function;
  conversation: Conversation;
  chat: Chat;
  sendQueryFromUser: Function;
  selectedConversation: any;
};

function ChatBottomSection({
  setSelectedConversation,
  setConversation,
  setWantToEndConv,
  handleChange,
  conversation,
  chat,
  sendQueryFromUser,
  selectedConversation,
}: Props) {
  const allConversation = useAppSelector((store) => store.conversation.value);
  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="w-[3%]">
        <div
          className="h-[40px] w-[40px] rounded-[50%] border border-white flex items-center justify-center mr-3 hover:cursor-pointer"
          onClick={() => {
            setSelectedConversation(allConversation.length + 1);
            setConversation({
              chatId: 0,
              chats: [],
              feedback: "",
              rating: 0,
            });
            setWantToEndConv(false);
          }}
        >
          <AddIcon />
        </div>
      </div>

      <input
        onChange={(e) => {
          handleChange(e);
        }}
        className="text-black h-[50px] rounded-xl w-[70%] px-4 focus:outline-none"
        type="text"
        name=""
        id=""
        value={chat.text}
        disabled={conversation?.feedback.length > 0 ? true : false}
      />
      <Button
        disabled={chat.text.length <= 0 ? true : false}
        sx={{
          height: 50,
          borderRadius: 50,
          width: "5%",
          "&:disabled": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
        onClick={() => {
          sendQueryFromUser();
        }}
        startIcon={
          <SendIcon
            sx={{
              marginLeft: 2,
            }}
          />
        }
        variant="contained"
        color="success"
      ></Button>
      <Button
        disabled={
          conversation.chats.length == 0 ||
          selectedConversation <= allConversation.length
            ? true
            : false
        }
        sx={{
          marginLeft: 2,
          width: "17%",
          "&:disabled": {
            backgroundColor: "gray",
            color: "white",
          },
        }}
        color="error"
        onClick={() => {
          setWantToEndConv(true);
        }}
      >
        End Your Conversation
      </Button>
    </div>
  );
}

export default ChatBottomSection;
