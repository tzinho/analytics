import type { Ref } from "react";
import { Badge } from "../ui/badge";
import { cn } from "~/lib/utils";

interface LiveBadgeProps {
  className?: string;
  ref?: Ref<HTMLSpanElement>;
}

export const LiveBadge = ({ ref, className }: LiveBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-cyan-500/50 bg-slate-800/50 text-xs text-cyan-400",
        className,
      )}
      ref={ref}
    >
      <div className="mr-1 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500"></div>
      LIVE
    </Badge>
  );
};
