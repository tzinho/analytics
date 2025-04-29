import { z } from "zod";
import { sub } from "date-fns";
import { Prisma } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  Dates,
  type Sale,
  type SaleCancelled,
  type SaleGroup,
  type Store,
} from "~/types/sales";
import { generateBetweenDates, toDate } from "~/lib/utils";

export const salesRouter = createTRPCRouter({
  sales: publicProcedure
    .input(
      z.object({
        storeSearch: z.string().optional(),
        dateSearch: z.nativeEnum(Dates),
      }),
    )
    .query(async ({ ctx, input: { storeSearch, dateSearch } }) => {
      const [dateInitial, dateFinal] = generateBetweenDates(dateSearch);

      //for_pag_nome
      //status_nota R | C | ""
      //uni_razao_social
      const data = await ctx.db.$queryRaw<Sale[]>`
        SELECT *, SUM(PV.PED_VALOR_DESCONTADO - PV.PED_CREDITO) AS ACUMULADO FROM TB_PEDIDOS_VENDAS PV
        INNER JOIN TB_PEDIDOS_VENDAS_FORMAS_PAGAMENTOS T2 ON (PV.PED_ID = T2.PED_PAG_PEDIDO_ID)
				INNER JOIN TB_FORMAS_PAGAMENTOS T3 ON (T2.PED_PAG_FORMA_PAGAMENTO_ID = T3.FOR_PAG_ID)
        INNER JOIN TB_UNIDADES U ON (PV.UNIDADE = U.UNI_ID)
        WHERE COALESCE(PV.STATUS_NOTA, '') <> ''
        AND PV.USUARIO_CADASTRO_DATA BETWEEN ${dateInitial} AND ${dateFinal}
        AND U.PERTENCEMERCATUDO = 1 ${storeSearch ? Prisma.sql`AND S.SET_ID = ${storeSearch}` : Prisma.empty}
        ORDER BY PV.USUARIO_CADASTRO_DATA DESC
      `;
      return data;
    }),
  salesCancelled: publicProcedure
    .input(
      z.object({
        storeSearch: z.string().optional(),
        dateSearch: z.nativeEnum(Dates),
      }),
    )
    .query(async ({ ctx, input: { storeSearch, dateSearch } }) => {
      const [dateInitial, dateFinal] = generateBetweenDates(dateSearch);
      const data = await ctx.db.$queryRaw<SaleCancelled[]>`
        SELECT S.SET_ID AS CC_CODIGO, S.SET_NOME AS CC, SUM(PV.PED_VALOR_DESCONTADO - PV.PED_CREDITO) AS ACUMULADO, PV.UNIDADE, COUNT(*) AS VENDAS, UPPER(LTRIM(RTRIM(COALESCE(PV.MOTIVO_CANC, 'SEM MOTIVO')))) AS MOTIVO_CANC FROM TB_PEDIDOS_VENDAS PV
        INNER JOIN TB_SETORES S ON (PV.SET_ID = S.SET_ID)
        INNER JOIN DBO.TB_UNIDADES U ON (S.SET_UNIDADE = U.UNI_ID)
        WHERE PV.USUARIO_CADASTRO_DATA BETWEEN ${dateInitial} AND ${dateFinal} 
          AND COALESCE(PV.STATUS_NOTA, '') = 'C' 
          AND U.PERTENCEMERCATUDO = 1 ${storeSearch ? Prisma.sql`AND S.SET_ID = ${storeSearch}` : Prisma.empty}
        GROUP BY PV.MOTIVO_CANC, S.SET_ID, PV.UNIDADE, S.SET_NOME
      `;
      return data;
    }),
  salesByStore: publicProcedure
    .input(
      z.object({
        storeSearch: z.string().optional(),
        dateSearch: z.nativeEnum(Dates),
      }),
    )
    .query(async ({ ctx, input: { storeSearch, dateSearch } }) => {
      const [dateInitial, dateFinal] = generateBetweenDates(dateSearch);
      const data = await ctx.db.$queryRaw<SaleGroup[]>`
        SELECT S.SET_ID AS CC_CODIGO, S.SET_NOME AS CC, SUM(PV.PED_VALOR_DESCONTADO - PV.PED_CREDITO) AS ACUMULADO, PV.UNIDADE, COUNT(*) AS VENDAS FROM TB_PEDIDOS_VENDAS PV
        INNER JOIN TB_SETORES S ON (PV.SET_ID = S.SET_ID)
        INNER JOIN DBO.TB_UNIDADES U ON (S.SET_UNIDADE = U.UNI_ID)
        WHERE PV.USUARIO_CADASTRO_DATA BETWEEN ${dateInitial} AND ${dateFinal} 
          AND COALESCE(PV.STATUS_NOTA, '') <> 'C' 
          AND PV.PED_RECEBIDO <> 'n' 
          AND U.PERTENCEMERCATUDO = 1 ${storeSearch ? Prisma.sql`AND S.SET_ID = ${storeSearch}` : Prisma.empty}
        GROUP BY S.SET_ID, PV.UNIDADE, S.SET_NOME
      `;
      return data;
    }),
  stores: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.$queryRaw<Store[]>`
      SELECT S.SET_ID AS CC_CODIGO, REPLACE(REPLACE(UPPER(S.SET_NOME), 'BAZAR ', ''), 'LOJA ', '') AS CC FROM TB_SETORES S 
      INNER JOIN TB_PEDIDOS_VENDAS PV ON (PV.SET_ID = S.SET_ID)
      INNER JOIN TB_UNIDADES U  ON (PV.UNIDADE = U.UNI_ID)
      WHERE S.SET_ID NOT IN ('300000096')
      GROUP BY S.SET_ID, S.SET_NOME
    `;
    return data;
  }),
  analytics: publicProcedure
    .input(
      z.object({
        code: z.string().optional(),
        dateSearch: z.nativeEnum(Dates),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [dateInitial, dateFinal] = generateBetweenDates(input.dateSearch);
      let previousDateInitial = toDate(sub(new Date(), { days: 1 }));

      if (input.dateSearch === Dates.Week)
        previousDateInitial = toDate(sub(new Date(), { weeks: 2 }));
      else if (input.dateSearch === Dates.Month)
        previousDateInitial = toDate(sub(new Date(), { months: 2 }));

      const previous = await ctx.db.$queryRaw<SaleGroup[]>`
        SELECT S.SET_ID AS CC_CODIGO, S.SET_NOME AS CC, SUM(PV.PED_VALOR_DESCONTADO - PV.PED_CREDITO) AS ACUMULADO, PV.UNIDADE, COUNT(*) AS VENDAS FROM TB_PEDIDOS_VENDAS PV
        INNER JOIN TB_SETORES S ON (PV.SET_ID = S.SET_ID)
        INNER JOIN DBO.TB_UNIDADES U ON (S.SET_UNIDADE = U.UNI_ID)
        WHERE PV.USUARIO_CADASTRO_DATA BETWEEN ${previousDateInitial} AND ${dateInitial} AND COALESCE(PV.STATUS_NOTA, '') <> 'C' AND PV.PED_RECEBIDO <> 'n' AND U.PERTENCEMERCATUDO = 1 AND S.SET_ID NOT IN ('300000096')
        GROUP BY
					S.SET_ID,
					PV.UNIDADE,
					S.SET_NOME
      `;

      const current = await ctx.db.$queryRaw<Sale[]>`
        SELECT S.SET_ID AS CC_CODIGO, UPPER(S.SET_NOME) AS CC, SUM(PV.PED_VALOR_DESCONTADO - PV.PED_CREDITO) AS ACUMULADO, PV.UNIDADE, COUNT(*) AS VENDAS FROM TB_PEDIDOS_VENDAS PV
        INNER JOIN TB_SETORES S ON (PV.SET_ID = S.SET_ID)
        INNER JOIN DBO.TB_UNIDADES U ON (S.SET_UNIDADE = U.UNI_ID)
        WHERE PV.USUARIO_CADASTRO_DATA BETWEEN ${dateInitial} AND ${dateFinal} AND COALESCE(PV.STATUS_NOTA, '') <> 'C' AND PV.PED_RECEBIDO <> 'n' AND U.PERTENCEMERCATUDO = 1 AND S.SET_ID NOT IN ('300000096') 
        GROUP BY
					S.SET_ID,
					PV.UNIDADE,
					S.SET_NOME
      `;

      return { current, previous };
    }),
});
