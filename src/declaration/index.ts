import { PayType } from "../constants";

export enum SALE_TYPE {
    PACKAGE = 'PACKAGE',
    PRODUCT = 'PRODUCT'
}

export class BillOrderReqDto {
    storeId: string;
    discount: number;
    clientName: string;
    clientPhoneNumber: string;
    saleType: SALE_TYPE;
    payType: PayType;
    tip: number;
    total: number;
    file: File | null;
    products: string;
    rateStar: number | null;

    constructor(data: Partial<BillOrderReqDto>) {
        Object.assign(this, data);
    }
    
}