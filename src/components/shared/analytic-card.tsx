import type React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "~/lib/utils";

export const AnalyticCard: React.FC<React.ComponentProps<"div">> = ({
  children,
}) => {
  return <Card className="w-full">{children}</Card>;
};

export const AnalyticCardTitle = ({
  children,
  className,
}: React.ComponentProps<"div">) => {
  return (
    <CardHeader>
      <CardTitle className={cn("w-full", className)}>{children}</CardTitle>
    </CardHeader>
  );
};

export const AnalyticCardContent: React.FC<React.ComponentProps<"div">> = ({
  className,
  children,
}) => {
  return (
    <CardContent>
      <span className={cn("w-full text-3xl font-bold", className)}>
        {children}
      </span>
    </CardContent>
  );
};

export const AnalyticCardFooter: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
}) => {
  return (
    <CardFooter>
      <div className={cn("flex w-full flex-col", className)}>{children}</div>
    </CardFooter>
  );
};
