"use client";
import FeedbackForm from "@/components/FeedbackForm/FeedbackForm";
import ListOfConversation from "@/components/ListOfConversation/ListOfConversation";
import UserFeedback from "@/components/UserFeedBack/UserFeedback";
import { addConversation } from "@/redux/Slice/coversationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAiChat } from "@/services/getAiChat";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { saveConv } from "@/services/saveConversation";
import ChatContentSection from "./ChatContentSection";
import ChatBottomSection from "./ChatBottomSection";

function ChatPage() {
  const allConversation = useAppSelector((store) => store.conversation.value);
  const dispatch = useAppDispatch();
  const [selectedConversation, setSelectedConversation] = useState<number>(1);
  const [wantToEndConv, setWantToEndConv] = useState<boolean>(false);
  const [showLikeBtn, setShowLikeBtn] = useState<number | undefined>(undefined);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [conversation, setConversation] = useState<Conversation>({
    chatId: 0,
    chats: [] as Chat[],
    feedback: "",
    rating: 0,
  });
  const [chat, setChat] = useState<Chat>({
    text: "",
    sendBy: "",
    timestamp: 0,
    like: null,
  });

  // End Conversation Function
  async function endConversation() {
    setWantToEndConv(false);
    setConversation({
      chatId: 0,
      chats: [],
      feedback: "",
      rating: 0,
    });
    setSelectedConversation(selectedConversation + 1);
    saveConversation();
  }

  // Adding Query to the state
  function sendQueryFromUser() {
    setConversation({
      chatId: selectedConversation,
      chats: [...conversation.chats, chat],
      feedback: "",
      rating: 0,
    });
    setChat({
      like: null,
      sendBy: "",
      text: "",
      timestamp: 0,
    });
  }

  // Adding query to chat state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChat({
      ...chat,
      text: e.target.value,
      sendBy: "user",
      timestamp: Math.floor(Date.now() / 1000),
    });
  };

  useEffect(() => {
    // Set conversation state from selected conversation ID
    if (selectedConversation != 0) {
      let convFilter: Conversation | undefined = undefined;
      for (let i = 0; i < allConversation.length; i++) {
        if (allConversation[i].chatId == selectedConversation) {
          convFilter = allConversation[i];
          break;
        }
      }
      if (convFilter) {
        setConversation(convFilter);
      }
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (conversation?.chats[conversation.chats.length - 1]?.sendBy == "user") {
      getAiResponse();
    }
  }, [conversation.chats.length]);

  // Getting AI response after user query
  async function getAiResponse() {
    const response = await getAiChat();
    receiveQueryFromAi(response.message);
  }

  // Setting the AI response to the conversation list
  const receiveQueryFromAi = (response: string) => {
    setConversation({
      chatId: selectedConversation,
      chats: [
        ...conversation.chats,
        {
          text: response,
          timestamp: Math.floor(Date.now() / 1000),
          sendBy: "ai",
          like: null,
        },
      ],
      feedback: "",
      rating: 0,
    });
  };

  // At the time of ending conversation setting feedback to the conversation
  function getFeedback(feedback: string, rating: number) {
    let feedbackAfterConv: Conversation = { ...conversation };
    feedbackAfterConv.feedback = feedback;
    feedbackAfterConv.rating = rating;
    dispatch(addConversation(feedbackAfterConv));
    endConversation();
  }

  // Save conversation to the store
  async function saveConversation() {
    const response = await saveConv();
    alert(response.message);
  }

  return (
    <div className="bg-gradient-to-br from-[#12121d] via-[#2a2a44] to-[#12121d] h-[100vh] w-[100vw] flex items-center">
      <Link
        href="/feedbackpage"
        className={`${
          openSidebar
            ? "fixed left-0 bottom-[50px] w-[20vw] flex items-center justify-center border py-4"
            : "fixed left-0 bottom-[50px] w-[5vw] flex items-center justify-center border py-4"
        }`}
      >
        {openSidebar ? (
          <div className="w-[30%] opacity-[1] transition-all">Feedback</div>
        ) : (
          <div className="w-[0%] opacity-[0] transition-all">Feedback</div>
        )}
        <FeedbackIcon />
      </Link>
      <Link
        href="/"
        className={`${
          openSidebar
            ? "fixed left-0 bottom-0 w-[20vw] flex items-center justify-center border py-4"
            : "fixed left-0 bottom-0 w-[5vw] flex items-center justify-center border py-4"
        }`}
      >
        {openSidebar ? (
          <div className="w-[30%] opacity-[1] transition-all">Home</div>
        ) : (
          <div className="w-[0%] opacity-[0] transition-all">Home</div>
        )}
        <HomeIcon />
      </Link>
      <div
        className={`${
          openSidebar
            ? "w-[20%] border-r-2 border-r-slate-300 h-full transition-all"
            : "w-[5%] border-r-2 border-r-slate-300 h-full transition-all"
        }`}
      >
        <div className="flex justify-end items-center px-3 py-2">
          <div
            onClick={() => {
              setOpenSidebar(!openSidebar);
            }}
            className="h-[40px] w-[40px] rounded-[50%] border border-white flex items-center justify-center hover:cursor-pointer"
          >
            {openSidebar == false ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </div>
        </div>

        {openSidebar == true && (
          <ListOfConversation
            selectedChatFn={setSelectedConversation}
            openedChat={selectedConversation}
          />
        )}
      </div>

      <div
        className={`${
          openSidebar
            ? "w-[80%] h-[100vh] p-4 overflow-hidden flex flex-col justify-end transition-all"
            : "w-[95%] h-[100vh] p-4 overflow-hidden flex flex-col justify-end transition-all"
        }`}
      >
        {wantToEndConv && (
          <div className="fixed z-[100] bg-[#00000043] backdrop-blur-[5px] flex items-center justify-center h-[100vh] w-[100vw] top-0 left-0">
            <FeedbackForm feedback={getFeedback} />
          </div>
        )}
        <div className="h-[90vh] overflow-auto flex flex-col justify-end pb-5">
          <ChatContentSection
            conversation={conversation}
            setConversation={setConversation}
            setShowLikeBtn={setShowLikeBtn}
            showLikeBtn={showLikeBtn}
          />
          {conversation.feedback.length > 0 && (
            <div className="flex items-center justify-center mt-[100px]">
              <div className="max-w-[70%] min-w-[20%]">
                <UserFeedback
                  feedbackText={conversation.feedback}
                  rating={conversation.rating}
                />
              </div>
            </div>
          )}
        </div>
        <ChatBottomSection
          chat={chat}
          conversation={conversation}
          handleChange={handleChange}
          selectedConversation={selectedConversation}
          sendQueryFromUser={sendQueryFromUser}
          setConversation={setConversation}
          setSelectedConversation={setSelectedConversation}
          setWantToEndConv={setWantToEndConv}
        />
      </div>
    </div>
  );
}

export default ChatPage;
