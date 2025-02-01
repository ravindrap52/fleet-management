import { Button } from "@/components/ui/button";
import Message from "@/components/ui/Message";

export default function Notifications() {
  return (
    <>
      <Button variant="outline" size="lg" className="relative">
        {/* on large screens, showing count and the message */}
        <span className="hidden lg:inline"> 2 Messages</span>
         {/* for small screens, we are showing the message icon  */}
        <Message  />
        {/* notification badge for small screens */}
        <span className="absolute top-[-10px] right-[-10px] flex justify-center items-center w-5 h-5 text-md lg:hidden rounded-full bg-background">
          10
        </span>
      </Button>
    </>
  );
}
