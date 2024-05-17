
export enum PayType {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  CREDIT = 'CREDIT',
}

export const paymentTypes = [
  {
    label: "Cash",
    value: PayType.CASH,
  },
  {
    label: "Transfer Money",
    value: PayType.TRANSFER,
  },
  {
    label: "Credit",
    value: PayType.CREDIT,
  },
];

export const MAX_LENGTH = 14;

export const STORAGE_KEY = {
  STORE_DETAIL: "store",
  TOKEN_DATA: "tokenData",
  USER_DETAIL: "userDetail"
};

export const LOADING_ROUTES_URL = ["/auth/sign-in", "/product/barcode","/packages/staff"];
export const STORE_URL_API = ["/store/list"]

export const TYPE_PAGE = {
  SALES_PRODUCT: "salesProduct",
  IMPORT_PRODUCT: "importProduct",
};

export const PRICE_USD = 1.1;


