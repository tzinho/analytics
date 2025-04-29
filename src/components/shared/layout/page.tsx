"use client";

import type { PropsWithChildren } from "react";
import type React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "~/lib/utils";
import { Navbar } from "./navbar";

const ErrorComponent = () => {
  return <div>Semething went wrong!</div>;
};

export const Page: React.FC<PropsWithChildren<React.ComponentProps<"div">>> = ({
  children,
  className,
  ref,
}) => {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Navbar />
      <main
        ref={ref}
        className={cn("flex min-h-screen flex-col items-center p-4", className)}
      >
        {children}
      </main>
    </ErrorBoundary>
  );
};
