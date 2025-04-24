"use client";

import type { Ref } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";

interface PercentageBadgeProps {
  value: number;
  className?: string;
  ref?: Ref<HTMLSpanElement>;
}

export const PercentageBadge: React.FC<PercentageBadgeProps> = ({
  value,
  className,
  ref,
}) => {
  const isGreatherThanPrevious = value > 0;
  const Icon = isGreatherThanPrevious ? TrendingUp : TrendingDown;

  return (
    <Badge
      className={cn(
        isGreatherThanPrevious ? "bg-green-600" : "bg-red-600",
        className,
      )}
      ref={ref}
    >
      <Icon /> {value}%
    </Badge>
  );
};
