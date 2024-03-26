import moment from "moment";

interface MessageItemProps {
  user: any;
  message: any;
}

const MessageItem: React.FC<MessageItemProps> = ({ user, message }) => {
  return (
    <div
      id="message-46"
      className="relative flex-shrink-0 flex py-1 px-4 transition ease-out duration-150 z-30"
    >
      <div className="flex-1">
        <div>
          <span
            data-user={message?.side === 0}
            className="font-semibold text-blue-600 data-[user=true]:text-red-600"
          >
            {message?.sender}
          </span>
        </div>
        <div className="w-full">
          <div>
            <div className="whitespace-pre-wrap">{message?.text}</div>
          </div>
        </div>
      </div>
      <div className="text-right flex-none flex items-center self-start">
        <div className="text-gray-400 font-light text-xs w-12">
          {moment(message?.date ?? 0).format("MMM D")}
          <br />
          {moment(message?.date ?? 0).format("H:m")}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
