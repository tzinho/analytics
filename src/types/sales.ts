export type Store = {
  CC_CODIGO: number;
  CC: string;
};

export type SaleGroup = {
  CC: string;
  CC_CODIGO: number;
  ACUMULADO: number;
  UNIDADE: number;
  VENDAS: number;
};

export type Sale = {
  PED_ID: string;
  UNI_RAZAO_SOCIAL: string;
  VALOR: number;
};

export type SaleCancelled = {
  MOTIVO_CANC: string;
} & Sale;

export enum Dates {
  Day,
  Week,
  Month,
}
