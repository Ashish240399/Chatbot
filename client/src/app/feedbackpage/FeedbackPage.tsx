"use client";
import FeedbackTable from "@/components/FeedbackTable/FeedbackTable";
import { useAppSelector } from "@/redux/hooks";
import { ChevronLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function FeedbackPage({}: Props) {
  const router = useRouter();
  const allConversation: Conversation[] = useAppSelector(
    (store) => store.conversation.value
  );
  return (
    <div className="p-6">
      <div
        className="h-[40px] w-[40px] rounded-[50%] border flex items-center justify-center hover:cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeft />
      </div>
      <p className="text-[24px] font-bold text-center">Feedback Table</p>

      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-[70%]">
          <FeedbackTable conversation={allConversation} />
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
