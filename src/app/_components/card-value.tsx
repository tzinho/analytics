"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import {
  AnalyticCard,
  AnalyticCardTitle,
  AnalyticCardContent,
  AnalyticCardFooter,
} from "~/components/shared/analytic-card";
import { Button } from "~/components/ui/button";
import { BadgeDollarSign } from "lucide-react";

interface CardValueProps {
  total: number;
}

export const CardValue = ({ total }: CardValueProps) => {
  const count = useMotionValue<number>(0);
  const rounded = useTransform<number, string>(() =>
    count.get().toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    }),
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
          Valor <BadgeDollarSign className="fill-yellow-400" />
        </div>
      </AnalyticCardTitle>
      <AnalyticCardContent>
        <motion.span className="font-bold">{rounded}</motion.span>
      </AnalyticCardContent>
      <AnalyticCardFooter>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm">Valor arrecadado no período</span>
            <span className="text-muted-foreground text-[10px]">
              Clique em detalhes pra ver o relatório detalhado
            </span>
          </div>

          <Button className="cursor-pointer text-[12px]" size="sm">
            Ver detalhes
          </Button>
        </div>
      </AnalyticCardFooter>
    </AnalyticCard>
  );
};
