import { useState } from "react";
import { MessageSquareMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import NotificationPanel from "@/components/NotificationPanel";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="relative"
        onClick={() => setOpen(true)}
      >
        {/* on large screens, showing count and the message */}
        <span className="hidden lg:inline"> 2 Messages</span>
        {/* for small screens, we are showing the message icon  */}
        <MessageSquareMore
          size={24}
          aria-label="message icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        />
        {/* notification badge for small screens */}
        <span className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-5 h-5 text-md lg:hidden rounded-full bg-background">
          10
        </span>
      </Button>
      <NotificationPanel open={open} setOpen={setOpen} />
    </div>
  );
}
