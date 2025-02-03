import { useState } from "react";
import { useSelector } from "react-redux";
import { MessageSquareMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import NotificationPanel from "@/components/NotificationPanel";

import { RootState } from "@/store";

export default function Notifications() {
  // handling state of the notification dropdown
  const [open, setOpen] = useState(false);

  // selecting the notifications
  const messages = useSelector((state: RootState) => state.notifications.messages);
  
  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="relative"
        onClick={() => setOpen(true)}
      >
        {/* on large screens, showing count and the message */}
        <span className="hidden lg:inline"> {messages.length} Messages</span>
        {/* for small screens, we are showing the message icon  */}
        <MessageSquareMore
          size={24}
          aria-label="message icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        />
        {/* notification badge for small screens */}
        <span className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-5 h-5 text-md lg:hidden rounded-full bg-background">
          {messages.length}
        </span>
      </Button>
      <NotificationPanel open={open} setOpen={setOpen} alerts={messages} />
    </div>
  );
}
