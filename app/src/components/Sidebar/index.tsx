"use client";

import Image from "next/image";

import Logo from "@/assets/logo.jpg";
import TicketStatusMenu from "../TicketStatusMenu";
import TicketItem from "./TicketItem";
import { useEffect, useState } from "react";
import useTicketInfo from "@/hooks/useTicketInfo";
import useAuth from "@/hooks/useAuth";

const Sidebar = () => {
  const { allTickets, filter } = useTicketInfo();
  const { photo, isAuth } = useAuth();
  return (
    <div className="flex flex-col w-[300px] min-w-[300px] border-r border-[#e5e7eb] h-screen max-md:-ml-[300px]">
      <div className="flex justify-between items-center border-b border-[#e5e7eb] pl-2 pr-4">
        <TicketStatusMenu />
        <Image
          src={photo ?? Logo.src}
          width={Logo.width}
          height={Logo.height}
          alt="logo"
          className="w-[35px] h-[35px] rounded-full"
        />
      </div>
      {isAuth && (
        <div className="overflow-y-auto">
          {allTickets
            .filter((item: any) => filter.includes(item.status))
            .map((item: any, i: number) => (
              <TicketItem key={i} data={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
