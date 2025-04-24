"use client";

import React, { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import { api } from "~/trpc/react";
import { Page } from "~/components/shared/layout/page";
import { Dates, type Sale } from "~/types/sales";
import { generateRandomColor, sumBy } from "~/lib/utils";
import { ButtonToggle } from "~/components/shared/button-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CardValue } from "./card-value";
import { CardSales } from "./card-sales";
import { Combobox } from "./combobox";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Ban } from "lucide-react";

const chartConfig = {
  VENDAS: {
    label: "Vendas",
  },
} satisfies ChartConfig;

export const Body = () => {
  const [storeSearch, setStoreSearch] = useState<string>("");
  const [dateSearch, setDateSearch] = useState<Dates>(Dates.Day);

  const { refetch: refetchSales, data: sales } =
    api.sales.salesByStore.useQuery({
      dateSearch,
      storeSearch,
    });

  const { refetch: refetchCancelled, data: salesCancelled } =
    api.sales.salesCancelled.useQuery({
      dateSearch,
      storeSearch,
    });

  const { data: stores } = api.sales.stores.useQuery();

  console.log("salesCancelled", salesCancelled);

  useEffect(() => {
    void refetchSales();
    void refetchCancelled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeSearch, dateSearch]);

  const salesValue = sumBy<Sale>(sales, "ACUMULADO");
  const salesCount = sumBy<Sale>(sales, "VENDAS");

  const chartData = React.useMemo(() => {
    return salesCancelled?.map((sale) => ({
      ...sale,
      CC: sale.CC,
      value: sale.ACUMULADO / 25,
      fill: generateRandomColor(),
    }));
  }, [salesCancelled]);

  console.log("chartData", chartData);

  return (
    <Page>
      <div className="flex h-full w-full flex-col items-center gap-3">
        <div className="flex w-full flex-col items-center justify-end gap-3 md:flex-row">
          <Combobox
            options={
              stores?.map((store) => ({
                label: store.CC,
                value: String(store.CC_CODIGO),
              })) ?? []
            }
            value={storeSearch}
            onChange={(value) => setStoreSearch(value)}
          />
          <ButtonToggle date={dateSearch} setView={setDateSearch} />
        </div>

        <div className="grid grid-cols-1 place-items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          <CardValue total={salesValue} />
          <CardSales total={salesCount} />
        </div>

        <div className="flex h-full w-full justify-center">
          <Card className="flex w-full max-w-[350px] flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>
                <div className="flex justify-between">
                  Vendas Canceladas <Ban className="fill-red-400" />
                </div>
              </CardTitle>
              <CardDescription>Vendas canceladas</CardDescription>
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
                    data={salesCancelled}
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
                                {sumBy(
                                  salesCancelled,
                                  "VENDAS",
                                ).toLocaleString()}
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
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
    </Page>
  );
};
