"use client";

import React, { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import { Dates, type SaleGroup } from "~/types/sales";
import { sumBy } from "~/lib/utils";
import { CardValue } from "./card-value";
import { CardSales } from "./card-sales";
import { Combobox } from "./combobox";
import { SalesCancelledChart } from "./sales-cancelled";
import { ButtonToggle } from "~/components/shared/button-toggle";
import { Page } from "~/components/shared/layout/page";
import { APIStatus } from "~/components/shared/api-status";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TableSales } from "./table";
import { CardTicket } from "./card-ticket";

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

  const salesTable = api.sales.sales.useQuery({
    dateSearch,
    storeSearch,
  });

  useEffect(() => {
    void refetchSales();
    void refetchCancelled();
    void salesTable.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeSearch, dateSearch]);

  console.log("salesTable", salesTable.data);

  const salesValue = sumBy<SaleGroup>(sales, "ACUMULADO");
  const salesCount = sumBy<SaleGroup>(sales, "VENDAS");

  return (
    <Page>
      <div className="flex h-full w-full flex-col items-center gap-3">
        <div className="flex w-full flex-1 flex-col items-center justify-end gap-3 md:flex-row">
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

        <div className="grid w-full flex-1 grid-cols-1 place-items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          <CardValue total={salesValue} />
          <CardSales total={salesCount} />
          {salesValue && salesCount && (
            <CardTicket total={salesValue / salesCount} />
          )}
        </div>

        {storeSearch && (
          <div className="grid w-full flex-grow grid-cols-1 place-items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
            {salesCancelled && <SalesCancelledChart data={salesCancelled} />}
          </div>
        )}

        {/* <Tabs defaultValue="vendas" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <TableSales data={salesTable.data} />
          </TabsContent>
          <TabsContent value="cancelled">
            <TableSales data={salesTable.data} />
          </TabsContent>
        </Tabs> */}

        <APIStatus />
      </div>
    </Page>
  );
};
