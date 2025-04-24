"use client";

import React, { useState } from "react";

import { Page } from "~/components/shared/layout/page";
import { ButtonGroup } from "~/components/shared/button-group";
import { api } from "~/trpc/react";
import { Dates, type Sale } from "~/types/sales";
import { getPercentage, isArrayEmpty, sumBy } from "~/lib/utils";
import { CardValue } from "./card-value";
import { CardSales } from "./card-sales";
import { PieSales } from "./pie-chart";
import { Combobox } from "./combobox";

export const Body = () => {
  const [storeSearch, setStoreSearch] = useState<string>("");
  const [dateSearch, setDateSearch] = useState<Dates>(Dates.Day);

  const { refetch, data } = api.sales.analytics.useQuery({ dateSearch });
  const { data: stores } = api.sales.stores.useQuery();

  const handleSearch = (dateSearch: Dates) => {
    setDateSearch(dateSearch);
    void refetch();
  };

  const queryRawCurrentData = storeSearch
    ? ([
        data?.current?.find((store) => String(store.CC_CODIGO) === storeSearch),
      ] as Sale[])
    : data?.current;

  const queryRawPreviousData = storeSearch
    ? ([
        data?.previous?.find(
          (store) => String(store.CC_CODIGO) === storeSearch,
        ),
      ] as Sale[])
    : data?.current;

  const currentTotal = sumBy<Sale>(queryRawCurrentData, "ACUMULADO");
  const currentSales = sumBy<Sale>(queryRawCurrentData, "VENDAS");
  const previousTotal = sumBy<Sale>(queryRawPreviousData, "ACUMULADO");
  const previousSales = sumBy<Sale>(queryRawPreviousData, "VENDAS");

  const percentageTotal = getPercentage(previousTotal, currentTotal);
  const percentageSales = getPercentage(previousSales, currentSales);

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
          <ButtonGroup onChange={handleSearch} />
        </div>

        <div className="grid grid-cols-1 place-items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* <CardValue total={currentTotal} percentage={percentageTotal} />
          <CardSales total={currentSales} percentage={percentageSales} /> */}
        </div>

        {!storeSearch && !isArrayEmpty(data?.current) && (
          <div className="grid grid-cols-1 place-items-stretch gap-3 md:grid-cols-2 lg:grid-cols-3">
            {/* <PieSales
              data={data?.current}
              percentage={percentageSales}
              dateSearch={dateSearch}
              description="Quantidade de vendas por período"
            /> */}
          </div>
        )}
      </div>
    </Page>
  );
};
