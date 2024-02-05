"use client";
import AiText from "@/components/Text/AiText";
import UserText from "@/components/Text/UserText";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

type Props = {
  conversation: Conversation;
  setShowLikeBtn: Function;
  showLikeBtn: any;
  setConversation: Function;
};

function ChatContentSection({
  conversation,
  setShowLikeBtn,
  showLikeBtn,
  setConversation,
}: Props) {
  return (
    <div>
      {conversation.chats.map((chat: Chat, index: number) => (
        <div>
          {chat.sendBy == "user" ? (
            <UserText message={chat.text} />
          ) : (
            <div
              onMouseEnter={() => {
                setShowLikeBtn(index);
              }}
              onMouseLeave={() => {
                setShowLikeBtn(undefined);
              }}
              className="relative w-fit"
            >
              <AiText message={chat.text} />
              {showLikeBtn === index &&
                conversation.feedback.length == 0 &&
                chat.like == null && (
                  <div className="absolute top-[90%] right-0 flex items-center justify-center gap-2">
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setConversation({
                          ...conversation,
                          chats: conversation.chats.map((chat, chatIndex) => {
                            if (chatIndex === index && !chat.like) {
                              return { ...chat, like: true };
                            }
                            return chat;
                          }),
                        });
                      }}
                    >
                      <ThumbUpIcon
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    <div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setConversation({
                          ...conversation,
                          chats: conversation.chats.map((chat, chatIndex) => {
                            if (chatIndex === index && !chat.like) {
                              return { ...chat, like: false };
                            }
                            return chat;
                          }),
                        });
                      }}
                    >
                      <ThumbDownIcon
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    </div>
                  </div>
                )}
              {chat.like != null && (
                <div className="absolute top-[100%] right-0 flex items-center justify-center">
                  {chat.like === false ? (
                    <ThumbDownIcon
                      sx={{
                        fontSize: "14px",
                        color: "red",
                      }}
                    />
                  ) : (
                    <ThumbUpIcon
                      sx={{
                        fontSize: "14px",
                        color: "gold",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatContentSection;
