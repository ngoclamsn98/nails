import { StaffPath } from "./declaration";

const LOGIN: string = "/login";
const STORE: string = "/store";
const HOME: string = "/home";
const BUY_PRODUCT: string = "/buy-product";


const STAFF: StaffPath = {
  BILL_ORDER: "/staff/bill-order",
};

const MANAGER_STORE: StaffPath = {
  IMPORT_PRODUCT: "/import/import-product",
};

export { LOGIN, STAFF, STORE, MANAGER_STORE, HOME, BUY_PRODUCT };
