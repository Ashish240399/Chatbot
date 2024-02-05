import React from "react";

type Props = {
  message: string;
};

function UserText({ message }: Props) {
  return (
    <div className="flex items-center justify-end mt-3">
      <div className="text-right max-w-[30vw] bg-slate-600 text-white px-2 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-0 rounded-bl-2xl text-[12px]">
        {message}
      </div>
    </div>
  );
}

export default UserText;
