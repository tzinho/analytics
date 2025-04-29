"use client";

import { useMemo } from "react";
import { Ban } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { generateRandomColor, sumBy } from "~/lib/utils";
import type { SaleCancelled } from "~/types/sales";

export const SalesCancelledChart = ({ data }: { data: SaleCancelled[] }) => {
  const chartConfig = {
    VENDAS: {
      label: "Vendas",
    },
  } satisfies ChartConfig;

  const chartData = useMemo(() => {
    return data?.map((sale) => ({
      ...sale,
      fill: generateRandomColor(),
    }));
  }, [data]);

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <div className="flex justify-between">
            Vendas Canceladas <Ban className="fill-red-400" />
          </div>
        </CardTitle>
        <CardDescription>
          Vendas canceladas no período selecionado
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="VENDAS"
              nameKey="MOTIVO_CANC"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {sumBy(chartData, "VENDAS").toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vendas canceladas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          {chartData?.map((store) => {
            return (
              <div
                key={store.MOTIVO_CANC}
                className="flex cursor-pointer items-center gap-3"
              >
                <div
                  className="size-4 rounded-sm"
                  style={{ backgroundColor: store.fill }}
                />
                <p>{store.MOTIVO_CANC}</p>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};
