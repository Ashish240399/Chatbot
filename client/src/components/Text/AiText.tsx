"use client";
import React, { useState } from "react";

type Props = {
  message: string;
};

function AiText({ message }: Props) {
  return (
    <div className="flex items-center justify-start mt-3 relative">
      <div className="text-right max-w-[30vw] bg-white text-slate-900 px-2 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-0 text-[12px]">
        {message}
      </div>
    </div>
  );
}

export default AiText;
