"use client";

import { Suspense } from "react";

import { api } from "~/trpc/react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { cn } from "~/lib/utils";

interface APIStatusIndicatorProps {
  isSuccess: boolean;
  className?: string;
}

const APIStatusIndicator = ({
  isSuccess,
  className,
}: APIStatusIndicatorProps) => {
  return (
    <div
      className={cn(
        "size-3 rounded-full",
        isSuccess ? "bg-green-500" : "bg-red-500",
        className,
      )}
    />
  );
};

const APIStatusCheckout = () => {
  const status = api.api.checkStatus.useQuery();

  return (
    <div className="flex items-center gap-2 rounded-md leading-5">
      <APIStatusIndicator isSuccess={status.isSuccess} />
      <div>
        <p className="font-semibold">
          Status da API: {status.isSuccess ? "Online" : "Offline"}
        </p>
        <p>Resposta: {status?.data?.message}</p>
      </div>
    </div>
  );
};

export const APIStatus = () => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border px-4 py-2">
      <div className="">
        <h2 className="text-2xl font-bold text-green-500">Status da API</h2>
        <p className="text-muted-foreground">
          Verifique a integridade do seu endpoint de API
        </p>
      </div>

      <Separator />

      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <APIStatusCheckout />
      </Suspense>
    </div>
  );
};
