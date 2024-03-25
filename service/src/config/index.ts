import dotenv from "dotenv";

dotenv.config();

if (!process.env.TG_BOT_TOKEN) {
  throw Error("INPUT YOUR TELEGRAM BOT TOKEN");
}
if (!process.env.TG_CHANNEL_ID) {
  throw Error("INPUT YOUR TELEGRAM CHANNEL ID");
}

export default {
  PORT: process.env.PORT || 8000,
  MONGO_URI: process.env.MONGO_URI ?? "",
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN ?? "",
  TG_CHANNEL_ID: process.env.TG_CHANNEL_ID ?? "",
  WSS_PORT: process.env.WSS_PORT ?? "8080",
  HELP_DESK_URL: process.env.HELP_DESK_URL ?? "",
};
