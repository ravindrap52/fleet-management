import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import { AppNotification } from "@/types/interface";

export default function NotificationPanel({
  open,
  setOpen,
  alerts,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  alerts: AppNotification[];
}) {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute invisible pointer-events-none"
          variant="ghost"
        ></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="min-w-[200px]  border border-[var(--border)] 
                   bg-[var(--card-bg)] text-[var(--foreground)] shadow-[var(--box-shadow)] z-[1000]"
      >
        {alerts.map((message) => (
          <DropdownMenuItem className={`w-full cursor-pointer px-4 py-2 whitespace-normal break-words leading-relaxed 
            hover:bg-[var(--hover)] 
            ${message.type === "critical" ? "text-[var(--status-maintenance)]" : ""}
            ${message.type === "warning" ? "text-[var(--status-idle)]" : ""}
            ${message.type === "error" ? "text-[var(--status-off)]" : ""}
          `}>
            {message.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
