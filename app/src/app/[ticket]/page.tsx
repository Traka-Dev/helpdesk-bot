"use client";

import ChatField from "@/components/ChatField";
import ChatInput from "@/components/ChatInput";
import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import useTicketInfo from "@/hooks/useTicketInfo";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

const TicketPage = () => {
  const { ticket } = useParams();
  const { tickets, fetchTicketHistory } = useTicketInfo();
  const { isAuth } = useAuth();

  console.log(isAuth);

  useEffect(() => {
    if (!isAuth) redirect("/");
  }, []);

  useEffect(() => {
    if (ticket) {
      fetchTicketHistory(Number(ticket.toString()));
    }
  }, [ticket]);

  const ticketData = ticket ? tickets?.[Number(ticket.toString())] : undefined;
  return !isAuth ? (
    <></>
  ) : !ticketData ? (
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
