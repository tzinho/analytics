import type { PropsWithChildren } from "react";
import type React from "react";

import { cn } from "~/lib/utils";

export const Page: React.FC<PropsWithChildren<React.ComponentProps<"div">>> = ({
  children,
  className,
  ref,
}) => {
  return (
    <main
      ref={ref}
      className={cn("flex min-h-screen flex-col items-center p-4", className)}
    >
      {children}
    </main>
  );
};
