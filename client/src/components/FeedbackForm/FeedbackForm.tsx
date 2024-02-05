"use client";
import { Button, Rating } from "@mui/material";
import React, { useState } from "react";

type Props = {
  feedback: Function;
};

function FeedbackForm({ feedback }: Props) {
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [value, setValue] = useState<number | null>(2);
  return (
    <div className="border border-red-200 p-3 rounded-lg bg-white text-black">
      <p className="text-[20px] font-bold text-center">Give Us Your Feedback</p>
      <div className="mt-3">
        <div>How Satisfy You Are ? </div>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div className="mt-3 flex flex-col">
        <textarea
          onChange={(e) => {
            setFeedbackText(e.target.value);
          }}
          name=""
          id=""
          cols={40}
          rows={10}
          className="text-black border border-gray-500 p-3 focus:outline-none"
        ></textarea>
        <div className="flex justify-end mt-4">
          <Button
            color="success"
            variant="contained"
            disabled={feedbackText.length > 0 ? false : true}
            onClick={() => {
              feedback(feedbackText, value);
            }}
          >
            Send Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
