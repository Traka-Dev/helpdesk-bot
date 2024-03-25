import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import User from "@/assets/user.png";

interface TicketItemProps {
  data: any;
  className?: string;
}

const TicketItem: React.FC<TicketItemProps> = ({ data, className }) => {
  return (
    <Link
      className={`block h-[66px] active ${className ?? ""}`}
      href={`/${data?.user?.id}`}
    >
      <div className="flex items-stretch h-full overflow-hidden pl-2 border-b border-gray-200 break-words-smart text-sm transition-[background] ease-out duration-150 bg-white hover:bg-gray-100 text-gray-800">
        <div className="flex-none self-center w-11 h-11 text-2xl">
          <div className="w-full h-full rounded-full">
            <Image
              src={User.src}
              width={44}
              height={44}
              alt="user"
              className="w-full h-full rounded-full inline-block"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start px-3 py-1.5">
          <div className="flex-none flex flex-row">
            <div className="text-[13px] flex-1 shave-selector-title overflow-hidden whitespace-no-wrap font-semibold">
              {data?.user?.name}
            </div>
            <div className="text-[11px] flex-none text-right text-[#404749]/50">
              {moment(data?.message?.[0]?.date ?? 0).format("H:m")}
            </div>
          </div>
          <div className="text-[13px] leading-tight flex-none mt-0 text-gray-400">
            {data?.message?.[0]?.side === 0 ? "" : "You: "}
            {data?.message?.[0]?.text?.slice(0, 10)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TicketItem;
