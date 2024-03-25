import MessageItem from "./MessageItem";

interface ChatFieldProps {
  user: any;
  messages: any;
}

const ChatField: React.FC<ChatFieldProps> = ({ user, messages }) => {
  return (
    <div className="relative z-10 flex pb-2 flex-col-reverse scrollbox break-words-smart text-sm flex-1 text-gray-600 overflow-y-auto">
      {messages
        ?.sort((a: any, b: any) =>
          new Date(a?.date ?? 0).getTime() < new Date(b?.date ?? 0).getTime()
            ? 1
            : -1
        )
        ?.map((item: any, i: number) => (
          <MessageItem key={i} user={user} message={item} />
        ))}
    </div>
  );
};

export default ChatField;
