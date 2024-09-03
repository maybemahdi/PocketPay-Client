/* eslint-disable react/prop-types */

import { formatDistanceToNow } from "date-fns";
import {
  MdOutlineMarkEmailRead,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";
import { Tooltip } from "react-tooltip";

const NotificationCard = ({
  notification,
  handleMarkAsRead,
  handleMarkAsUnread,
}) => {
  const timeAgo = formatDistanceToNow(new Date(notification?.time), {
    addSuffix: true,
  });

  return (
    <div className="w-full h-[100px] rounded-[20px] flex items-center justify-start shadow-xl">
      <div className="w-[50px] h-[50px] ml-[10px] rounded-[10px] bg-gradient-to-r from-[#d7cfcf] to-[#9198e5] transition-colors duration-500 ease-in-out hover:from-[#9198e5] hover:to-[#712020]"></div>
      <div className="w-[calc(100%-90px)] ml-[10px] text-black font-poppins">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-600 cursor-pointer font-concert tracking-[3px]">
            Pocket<span className="text-rose-500">Pay</span>
          </h3>
          <span className="text-[10px]">{timeAgo}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-[12px] font-light">{notification?.message}</p>
          {notification?.markAsRead ? (
            <button
              onClick={() => handleMarkAsUnread(notification?._id)}
              data-tooltip-id="my-tooltip2"
              data-tooltip-content="Mark Unread"
              className="text-rose-500 rounded"
            >
              <MdOutlineMarkEmailRead size={25} />
            </button>
          ) : (
            <button
              onClick={() => handleMarkAsRead(notification?._id)}
              data-tooltip-id="my-tooltip2"
              data-tooltip-content="Mark as Read"
              className="text-rose-500 rounded"
            >
              <MdOutlineMarkEmailUnread size={25} />
            </button>
          )}
          <Tooltip id="my-tooltip2" />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
