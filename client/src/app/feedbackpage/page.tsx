import React from "react";
import FeedbackPage from "./FeedbackPage";

type Props = {};

function FeedbackMainPage({}: Props) {
  return (
    <div className="bg-gradient-to-br from-[#12121d] via-[#2a2a44] to-[#12121d] h-[100vh]">
      <FeedbackPage />
    </div>
  );
}

export default FeedbackMainPage;
