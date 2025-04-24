"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
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
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Dates, type Sale } from "~/types/sales";
import { Badge } from "~/components/ui/badge";
import { generateRandomColor } from "~/lib/utils";

const chartConfig = {
  VENDAS: {
    label: "Vendas",
  },
} satisfies ChartConfig;

interface PieSalesProps {
  data: Sale[] | undefined;
  dateSearch: Dates;
  percentage: number;
  description: string;
}

export const PieSales: React.FC<PieSalesProps> = ({
  data,
  percentage,
  description,
  dateSearch,
}) => {
  const chartData = React.useMemo(() => {
    return data?.map((sale) => ({
      ...sale,
      CC: sale.CC.replace("BAZAR ", "").replace("LOJA ", ""),
      fill: generateRandomColor(),
    }));
  }, [data]);

  const totalSales = React.useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.VENDAS, 0);
  }, [data]);

  const desc = (
    <>
      <div className="flex items-center gap-2 leading-none font-medium">
        Diferença de{" "}
        <Badge variant={percentage < 0 ? "destructive" : "default"}>
          {percentage}%
        </Badge>{" "}
        no mesmo período
        {percentage > 0 ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
      </div>
      <div className="text-muted-foreground leading-none">
        Mostrando o total de vendas no período de{" "}
        {dateSearch === Dates.Week
          ? "7 dias"
          : dateSearch === Dates.Month
            ? "30 dias"
            : "1 dia"}
      </div>
    </>
  );

  return (
    <Card className="flex w-full max-w-[350px] flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vendas por lojas</CardTitle>
        <CardDescription>{description}</CardDescription>
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
              nameKey="CC"
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
                          {totalSales?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vendas
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
      <CardFooter className="flex-col gap-2 text-sm">
        {desc}

        <div className="w-full">
          {chartData?.map((store) => {
            return (
              <div
                key={store.CC_CODIGO}
                className="flex cursor-pointer items-center gap-3"
              >
                <div
                  className="size-4 rounded-sm"
                  style={{ backgroundColor: store.fill }}
                />
                <p>{store.CC}</p>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
};
