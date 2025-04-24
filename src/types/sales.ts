export type Store = {
  CC_CODIGO: number;
  CC: string;
};

export type Sale = {
  CC_CODIGO: number;
  CC: string;
  ACUMULADO: number;
  UNIDADE: number;
  VENDAS: number;
};

export enum Dates {
  Day,
  Week,
  Month,
}
