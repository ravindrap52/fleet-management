import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function NotificationPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
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
        <DropdownMenuItem className="w-full cursor-pointer px-4 py-2  hover:bg-[var(--hover)] whitespace-normal break-words leading-relaxed">
        Vehicle with vehicle ID: 123 is having high temperature
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full cursor-pointer px-3 py-2  hover:bg-[var(--hover)]">
          Message 2
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full cursor-pointer px-3 py-2  hover:bg-[var(--hover)]">
          Close
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
