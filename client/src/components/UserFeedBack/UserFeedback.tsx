import { Rating } from "@mui/material";
import React from "react";

type Props = {
  feedbackText: string;
  rating: number;
};

function UserFeedback({ feedbackText, rating }: Props) {
  return (
    <div className="max-w-[100%] rounded-xl bg-[#ffffff1a] backdrop-blur-[30px] shadow-[-15px_17px_17px_rgba(10,10,10,0.25)] overflow-hidden border-2 border-slate-500 text-white">
      <p className="p-3">Your Feedback</p>
      <div className="px-5">
        <Rating name="read-only" value={rating} readOnly />
      </div>

      <div className="mt-5 p-5">{feedbackText}</div>
    </div>
  );
}

export default UserFeedback;
