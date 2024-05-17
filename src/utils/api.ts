import axios from "axios";
import { CONVERT_VND_TO_USD } from "../constants/api";
import { PRICE_USD } from "../constants/index";

export const handleConvertVndToUSD = async (amount) => {
  if (!amount) return;
  const response = await axios.get(CONVERT_VND_TO_USD);
  const data = response.data;

  if (data.error) {
    throw new Error(data.error);
  }

  const rate = data.rates.VND;
  const result = amount / rate;
  return (result * PRICE_USD).toFixed(2);
};

export const handleGetPackage = () => {
  return new Promise((resolve, reject) => {
    resolve([
      {
        name: "package1",
        id: 1,
        categories: [
          {
            name: "Tóc",
            id: 1,
            products: [
              { name: "Nhuộm", id: 3, price: 200000 },
              { name: "Uốn", id: 4, price: null },
            ],
          },
          {
            name: "Nails",
            id: 2,
            products: [
              { name: "làm móng tay", id: 1, price: 9000 },
              { name: "làm móng chân", id: 2, price: null },
              { name: "sơn móng", id: 5, price: 90000 },
            ],
          },
        ],
      },
      {
        name: "package2",
        id: 2,
        categories: [
          {
            name: "Message",
            id: 3,
            products: [{ name: "Đấm lưng", id: 6 }],
          },
          {
            name: "Abc",
            id: 4,
            products: [{ name: "Xyz", id: 7 }],
          },
        ],
      },
    ]);
  });
};
