import { StaffPath } from "./declaration";

const LOGIN: string = "/login";
const STORE: string = "/store";

const STAFF: StaffPath = {
  HOME: "/staff",
  BILL_ORDER: "/staff/bill-order",
  PRODUCT: "/staff/product",
};

const MANAGER_STORE: StaffPath = {
  HOME: "/import",
  IMPORT_PRODUCT: "/import/import-product",
  PRODUCT: "/import/buy-product",
};

export { LOGIN, STAFF, STORE, MANAGER_STORE };
