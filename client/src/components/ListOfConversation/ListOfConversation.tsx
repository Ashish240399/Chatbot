"use client";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

type Props = {
  selectedChatFn: Function;
  openedChat: number;
};

function ListOfConversation({ selectedChatFn, openedChat }: Props) {
  const allConversation = useAppSelector((store) => store.conversation.value);
  return (
    <div className="border-t-2 border-t-slate-200 h-[80vh]">
      {allConversation.map((el: Conversation, id: number) => (
        <div
          className={`${
            openedChat == el.chatId
              ? "hover:cursor-pointer border-b-2 border-b-slate-200 p-3 hover:bg-slate-800 bg-slate-700"
              : "hover:cursor-pointer border-b-2 border-b-slate-200 p-3 hover:bg-slate-800"
          }`}
          onClick={() => {
            selectedChatFn(el.chatId);
          }}
          key={id}
        >
          {el.chats[0].text.substring(0, 20)}
        </div>
      ))}
    </div>
  );
}

export default ListOfConversation;
