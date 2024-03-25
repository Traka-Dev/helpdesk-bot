"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import ChevronDown from "./svgs/ChevronDown";
import useTicketInfo from "@/hooks/useTicketInfo";

const TicketStatusMenu = () => {
  const { filter, setFilter, allTickets } = useTicketInfo();

  const FILTERS = [
    { title: `All (${allTickets?.length})`, filter: [0, 1] },
    {
      title: `Open (${
        allTickets?.filter((item: any) => item?.status === 0).length
      })`,
      filter: [0],
    },
    {
      title: `Close (${
        allTickets?.filter((item: any) => item?.status === 1).length
      })`,
      filter: [1],
    },
  ];

  const actived = FILTERS.find(
    (item) => item.filter.toString() === filter.toString()
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="h-[50px] py-1 px-1">
        <Menu.Button className="flex flex-row items-center h-full whitespace-no-wrap px-2 font-medium text-[13px] leading-5 text-[#353A3C] focus:outline-none focus:bg-gray-100 rounded-md">
          <span>{actived?.title}</span>
          <ChevronDown className="ml-1.5 bg-[#F8FBFC] rounded-full text-[#353A3C] w-4 h-4" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 ml-1 z-50 rounded-md bg-white shadow-lg mt-1 border border-gray-200">
          {FILTERS.map((item) => (
            <Menu.Item>
              <button
                className="w-full text-left px-4 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 whitespace-nowrap"
                onClick={() => setFilter(item.filter)}
              >
                {item.title}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TicketStatusMenu;
