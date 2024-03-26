import { WebSocket, WebSocketServer } from "ws";
import config from "../config";
import Ticket from "../models/Tiicket";
import { Bot } from "grammy";

const bot = new Bot(config.TG_BOT_TOKEN);

const wss = new WebSocketServer(
  {
    port: Number(config.WSS_PORT),
  },
  () => {
    console.log(`WS Server is running at PORT ${config.WSS_PORT}`);
  }
);

wss.on("connection", (ws) => {
  console.log("connected");
  ws.send(JSON.stringify({ payload: "connected" }));
  ws.on("message", async (msg) => {
    try {
      const data = JSON.parse(msg.toString());
      console.log(data);
      if (data.payload === "answer") {
        if (data.ticket && data.message && data.sender) {
          const sent = await bot.api.sendMessage(data.ticket, data.message);
          console.log(sent);
          const result = await Ticket.updateOne(
            { "user.id": data.ticket },
            {
              $push: {
                messages: {
                  id: sent.message_id,
                  text: data.message,
                  date: Date.now(),
                  side: 1,
                  sender: data.sender,
                },
              },
            }
          );
        }
      } else if (data.payload === "get-ticket-history") {
        if (data.ticket) {
          const ticket = await Ticket.findOne({
            "user.id": data.ticket,
          }).select({ user: 1, messages: 1, _id: 0 });
          ws.send(JSON.stringify({ payload: "ticket-history", data: ticket }));
        }
      } else if (data.payload === "query") {
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                payload: "queried",
                data: data?.data,
              })
            );
          }
        });
      } else if (data.payload === "all-tickets") {
        const tickets = await Ticket.aggregate([
          {
            $project: {
              user: 1,
              status: 1,
              message: {
                $slice: ["$messages", -1],
              },
            },
          },
        ]);
        ws.send(JSON.stringify({ payload: "tickets", data: tickets }));
      } else if (data.payload === "set-open-status") {
        if (data.ticket) {
          const result = await Ticket.updateOne(
            { "user.id": data.ticket },
            { $set: { status: data.status } }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
  ws;
});
