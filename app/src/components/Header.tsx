"use client";

import Image from "next/image";
import Ticker from "./svgs/Ticker";
import ChevronLeft from "./svgs/ChevronLeft";
import { useParams } from "next/navigation";
import useTicketInfo from "@/hooks/useTicketInfo";
import Refresh from "./svgs/Refresh";
import User from "@/assets/user.png";

const Header = () => {
  const { ticket } = useParams();
  const { allTickets, setOpenStatus } = useTicketInfo();

  const ticketData = ticket
    ? allTickets.find((item: any) => item.user.id === Number(ticket.toString()))
    : undefined;

  return (
    <div className="relative flex items-center pl-4 pr-4 z-20 flex-none h-[50px] border-b border-gray-200">
      <button className="absolute inset-0 w-full h-full focus:outline-0"></button>
      <div className="flex-none text-blue-500 pr-2 relative z-10 md:hidden">
        <a>
          <ChevronLeft className="w-6" />
        </a>
      </div>
      <div className="flex-none self-center w-[35px] h-[35px]">
        <div className="w-[35px] h-[35px]">
          <div className="w-full h-full rounded-full">
            <Image
              width={35}
              height={35}
              alt=""
              src={User.src}
              className="w-full h-full rounded-full inline-block"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col ml-1.5 overflow-x-auto whitespace-nowrap md:overflow-hidden md:whitespace-normal w-1">
        <div className="min-w-[6rem] truncate text-[11px] md:text-sm text-[#353A3C] font-semibold leading-[1.1] md:leading-[1.1]">
          {ticketData?.user?.name}
        </div>
        <div className="text-[10px] md:text-xs text-[#404749]/[0.5] leading-[1.1] md:leading-[1.1] mt-0.5 font-normal select">
          via @stacker_ai_support_bot
        </div>
      </div>

      <div className="flex-none text-blue-500 md:ml-2 relative z-10">
        <div>
          <button
            type="button"
            title="Close chat"
            className="inline-flex items-center select-none justify-center w-9 h-9 rounded-md px-2 py-2 bg-white text-base leading-5 font-medium text-blue-700 shadow-[1px_1px_3px_0px_rgba(7,54,97,0.06)] focus:outline-none focus:bg-gray-100"
            onClick={() => setOpenStatus(Number(ticket.toString()))}
          >
            {ticketData?.status === 1 ? <Refresh /> : <Ticker />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
