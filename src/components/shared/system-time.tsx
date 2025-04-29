"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const SystemTime = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-primary w-full rounded-md border p-4 text-center">
      <p className="text-muted-foreground">System time</p>
      <p className="text-primary text-xl font-bold">
        {format(date, "HH:mm:ss")}
      </p>
      <p>{format(date, "MMM dd, yyyy", { locale: ptBR })}</p>
    </div>
  );
};
