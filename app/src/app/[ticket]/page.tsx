"use client";

import ChatField from "@/components/ChatField";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import useTicketInfo from "@/hooks/useTicketInfo";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const TicketPage = () => {
  const { ticket } = useParams();
  const { tickets, fetchTicketHistory } = useTicketInfo();

  useEffect(() => {
    if (ticket) {
      fetchTicketHistory(Number(ticket.toString()));
    }
  }, [ticket]);

  const ticketData = ticket ? tickets?.[Number(ticket.toString())] : undefined;
  return !ticketData ? (
    <div className="flex items-center justify-center flex-1 text-sm font-semibold text-[#404749]/[0.5]">
      Please select a chat
    </div>
  ) : (
    <>
      <Header />
      <ChatField user={ticketData?.user} messages={ticketData?.messages} />
      <ChatInput />
    </>
  );
};

export default TicketPage;
