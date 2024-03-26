"use client";

import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import useAuth from "./useAuth";

interface TicketInfoType {
  allTickets: any;
  tickets: any;
  fetchTicketHistory: any;
  sendQueryAnswer: any;
  setOpenStatus: any;
  filter: any;
  setFilter: any;
}

const defaultVal = {
  allTickets: [],
  tickets: {},
  fetchTicketHistory: () => {},
  sendQueryAnswer: () => {},
  setOpenStatus: () => {},
  filter: [0, 1],
  setFilter: () => {},
};

export const TicketInfoContext =
  React.createContext<TicketInfoType>(defaultVal);

export default function useTicketInfo() {
  return React.useContext(TicketInfoContext);
}

const WS_SERVER = process.env.NEXT_PUBLIC_WS_SERVER ?? "";

export const TicketInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { sendMessage, lastMessage } = useWebSocket(WS_SERVER);
  const [allTickets, setAllTickets] = useState<any>([]);
  const [tickets, setTickets] = useState<any>({});
  const [filter, setFilter] = useState([0, 1]);
  const { firstName, lastName } = useAuth();

  useEffect(() => {
    sendMessage(JSON.stringify({ payload: "all-tickets" }));
  }, []);

  useEffect(() => {
    try {
      if (lastMessage?.data) {
        const data = JSON.parse(lastMessage.data);
        console.log(data);

        if (data.payload === "tickets") {
          setAllTickets(data.data);
        } else if (data.payload === "ticket-history") {
          const ticketData = data?.data;
          if (ticketData?.user?.id) {
            setTickets((prevTickets: any) => ({
              ...prevTickets,
              [ticketData.user.id]: ticketData,
            }));
          }
        } else if (data.payload === "queried") {
          const messageData = data?.data;
          if (messageData) {
            let updatedData = { ...tickets };
            if (updatedData[messageData.user.id]) {
              updatedData[messageData.user.id].messages = [
                ...(updatedData[messageData.user.id]?.messages ?? []),
                messageData.message,
              ];

              const index = allTickets.findIndex(
                (item: any) => item?.user?.id === messageData.user.id
              );
              console.log(index);
              let updatedAllData = [...allTickets];
              updatedAllData[index].message = [messageData.message];
              setAllTickets(updatedAllData);
            } else {
              updatedData[messageData.user.id] = {
                user: messageData.user,
                messages: [messageData.message],
              };
              setAllTickets((prev: any) => [
                ...prev,
                {
                  user: messageData.user,
                  status: 0,
                  message: [messageData.message],
                },
              ]);
            }
            setTickets(() => updatedData);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [lastMessage]);

  const fetchTicketHistory = (id: number) => {
    sendMessage(JSON.stringify({ payload: "get-ticket-history", ticket: id }));
  };

  const sendQueryAnswer = (id: number, text: string) => {
    let updatedData = { ...tickets };
    const name = `${firstName} ${lastMessage ?? ""}`.trimEnd();
    updatedData[id].messages = [
      ...(updatedData[id]?.messages ?? []),
      {
        id: -1,
        text,
        side: 1,
        sender: name,
        date: Date.now(),
      },
    ];
    setTickets(updatedData);
    const index = allTickets.findIndex((item: any) => item?.user?.id === id);
    console.log(index);
    let updatedAllData = [...allTickets];
    updatedAllData[index].message = [
      {
        id: -1,
        text,
        side: 1,
        sender: name,
        date: Date.now(),
      },
    ];
    setAllTickets(updatedAllData);
    sendMessage(
      JSON.stringify({
        payload: "answer",
        ticket: id,
        message: text,
        sender: name,
      })
    );
  };

  const setOpenStatus = (id: number) => {
    const index = allTickets.findIndex((item: any) => item.user.id === id);

    if (index >= 0) {
      const updatedData = [...allTickets];
      const status = 1 - updatedData[index].status;
      updatedData[index] = {
        ...updatedData[index],
        status,
      };
      setAllTickets(updatedData);

      sendMessage(
        JSON.stringify({
          payload: "set-open-status",
          ticket: id,
          status,
        })
      );
    }
  };

  return (
    <TicketInfoContext.Provider
      value={{
        allTickets,
        tickets,
        fetchTicketHistory,
        sendQueryAnswer,
        setOpenStatus,
        filter,
        setFilter,
      }}
    >
      {children}
    </TicketInfoContext.Provider>
  );
};
