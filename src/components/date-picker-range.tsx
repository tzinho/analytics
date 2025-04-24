"use client";

import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "~/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "~/components/ui/calendar";
import { useController, useFormContext } from "react-hook-form";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  name,
}) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 1),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLLL dd, y", { locale: ptBR })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              setDate(range);
            }}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
