import { ReactNode } from "react";

export default function Header({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <header className="flex justify-between items-center px-6 bg-background border-b border-border shadow-md dark:shadow-lg">
      {children}
    </header>
  );
}
