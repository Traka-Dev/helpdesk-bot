import { Bot, InputFile } from "grammy";
import config from "../config";
import Ticket from "../models/Tiicket";
import { WebSocket } from "ws";

const bot = new Bot(config.TG_BOT_TOKEN);
const ws = new WebSocket("ws://localhost:8080");

bot.on("message", async (ctx) => {
  const { message } = ctx;

  if (message.text === "/start") {
    ctx.replyWithPhoto(new InputFile("./src/banner.jpg"), {
      parse_mode: "HTML",
      caption:
        "<b>Welcome to StackerAI Support</b>\n\nPlease enter your support query here. It will be forwarded to our team and you will receive a DM from one of our admins with your support ID within 12 hours. \n\n<i>Please verify the support bot in our telegram, we will never ask for your seed phrase, send links or ask you to connect your wallet when processing your request.</i>",
    });
  } else {
    const { first_name, last_name, id } = message.from;
    const { message_id, text } = message;

    console.log(
      JSON.stringify((await bot.api.getUserProfilePhotos(id)).photos)
    );

    try {
      await bot.api.sendMessage(
        config.TG_CHANNEL_ID,
        `<b>From</b> <a href="${config.HELP_DESK_URL}/${id}">${[
          first_name,
          last_name,
        ].join(" ")}</a> #id${id}\n-------\n${message.text}`,
        {
          parse_mode: "HTML",
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Open Chat",
                  url: `${config.HELP_DESK_URL}/${id}`,
                },
              ],
            ],
          },
        }
      );

      const updated = { id: message_id, text, date: Date.now(), side: 0 };

      const result = await Ticket.updateOne(
        { "user.id": id },
        {
          $push: {
            messages: updated,
          },
        }
      );

      if (!result.modifiedCount) {
        const ticket = new Ticket();
        ticket.user = { id, name: `${first_name} ${last_name}`.trimEnd() };
        ticket.messages.push(updated);
        await ticket.save();
      }

      ws.send(
        JSON.stringify({
          payload: "query",
          data: {
            message: {
              text,
              id: message_id,
              date: updated.date,
              side: 0,
            },
            user: {
              id,
              name: `${first_name} ${last_name}`.trimEnd(),
            },
          },
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
});

bot.start();
