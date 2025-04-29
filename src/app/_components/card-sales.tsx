"use client";

import type React from "react";
import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import {
  AnalyticCard,
  AnalyticCardTitle,
  AnalyticCardContent,
  AnalyticCardFooter,
} from "~/components/shared/analytic-card";
import { Button } from "~/components/ui/button";
import { Shirt } from "lucide-react";

interface CardSalesProps {
  total: number;
}

export const CardSales = ({ total }: CardSalesProps) => {
  const count = useMotionValue<number>(0);
  const rounded = useTransform<number, string>(() =>
    Math.round(count.get()).toLocaleString("pt-br"),
  );

  useEffect(() => {
    const controls = animate(count, total, { duration: 1 });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <AnalyticCard>
      <AnalyticCardTitle>
        <div className="flex justify-between">
          Vendas <Shirt className="size-5 fill-green-600" />
        </div>
      </AnalyticCardTitle>
      <AnalyticCardContent>
        <motion.span className="font-bold">{rounded}</motion.span>
      </AnalyticCardContent>
      <AnalyticCardFooter>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm">Vendas realizadas no período</span>
            <span className="text-muted-foreground text-[10px]">
              Clique pra ver o relatório detalhado
            </span>
          </div>

          <Button className="cursor-pointer text-[12px]" size="sm">
            Ver Detalhes
          </Button>
        </div>
      </AnalyticCardFooter>
    </AnalyticCard>
  );
};
