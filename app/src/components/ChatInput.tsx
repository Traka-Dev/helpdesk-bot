"use client";

import useTicketInfo from "@/hooks/useTicketInfo";
import { useParams } from "next/navigation";
import { useState } from "react";

const ChatInput = () => {
  const [answer, setAnswer] = useState("");
  const { sendQueryAnswer } = useTicketInfo();
  const { ticket } = useParams();

  const onAnswerChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQueryAnswer(Number(ticket.toString()), answer);
      setAnswer("");
    }
  };

  return (
    <div className="relative text-sm min-h-[50px] flex-none border-gray-200">
      <div className="border-b border-gray-200"></div>
      <div className="flex items-center min-h-[50px] w-full">
        <div className="flex-1 ml-4 ">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={onAnswerChange}
            className="outline-none overflow-auto w-full max-h-64 align-middle text-sm px-0 focus:ring-transparent text-gray-600 border-none bg-white --visible"
            placeholder="Type texts to answer..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
