"use client";

import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Badge } from "~/components/ui/badge";
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
import { generateRandomColor } from "~/lib/utils";
import { Dates, type Sale } from "~/types/sales";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

interface BarSalesProps {
  data: Sale[] | undefined;
  dateSearch: Dates;
  percentage: number;
  description: string;
}

export const BarSales: React.FC<BarSalesProps> = ({
  data,
  percentage,
  description,
  dateSearch,
}) => {
  const chartData = React.useMemo(() => {
    return data?.map((sale) => ({
      ...sale,
      CC: sale.CC.replace("BAZAR ", "").replace("LOJA ", ""),
      value: sale.ACUMULADO / 25,
      fill: generateRandomColor(),
    }));
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Vendas por lojas</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="ACUMULADO" hide />
            <YAxis
              dataKey="CC"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {desc}
      </CardFooter>
    </Card>
  );
};
