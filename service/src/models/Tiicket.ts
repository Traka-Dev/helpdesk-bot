import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    messages: [
      {
        id: Number,
        text: String,
        date: Date,
        side: Number,
      },
    ],
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("ticket", TicketSchema);
export default Ticket;
