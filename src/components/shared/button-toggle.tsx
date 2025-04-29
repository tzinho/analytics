"use client";

import type { ReactNode } from "react";
import { Calendar } from "lucide-react";

import { cn } from "~/lib/utils";
import { Dates } from "~/types/sales";

type ButtonTriggerProps = {
  date: Dates;
  setView: React.Dispatch<React.SetStateAction<Dates>>;
};

const ButtonTrigger = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "z-1 flex flex-1 cursor-pointer items-center justify-center",
        className,
      )}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};

const ButtonContent = ({
  children,
  isActive,
  className,
}: {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "text-sm transition-colors duration-300",
        className,
        isActive ? "text-white" : "text-black",
      )}
    >
      {children}
    </span>
  );
};

export const ButtonToggle = ({ date, setView }: ButtonTriggerProps) => {
  return (
    <div className="relative flex h-10 w-60 rounded-[100px] bg-black/10 lg:h-10">
      <div
        className="bg-primary absolute top-0 left-0 h-full w-1/3 transform rounded-[40px] duration-300 ease-out"
        style={{
          transform:
            date === Dates.Day
              ? "translateX(0)"
              : date === Dates.Week
                ? "translateX(100%)"
                : "translateX(200%)",
        }}
      />
      <ButtonTrigger onClick={() => setView(Dates.Day)}>
        <ButtonContent
          isActive={date === Dates.Day}
          className="flex items-center gap-1"
        >
          <Calendar className="size-3" /> 1 dia
        </ButtonContent>
      </ButtonTrigger>
      <ButtonTrigger onClick={() => setView(Dates.Week)}>
        <ButtonContent
          isActive={date === Dates.Week}
          className="flex items-center gap-1"
        >
          <Calendar className="size-3" /> 7 dias
        </ButtonContent>
      </ButtonTrigger>
      <ButtonTrigger onClick={() => setView(Dates.Month)}>
        <ButtonContent
          isActive={date === Dates.Month}
          className="flex items-center gap-1"
        >
          <Calendar className="size-3" /> 30 dias
        </ButtonContent>
      </ButtonTrigger>
    </div>
  );
};
