import axios from "axios";
import { CONVERT_VND_TO_USD } from '../constants/api';

export const handleConvertVndToUSD = async (amount) => {
  const response = await axios.get(CONVERT_VND_TO_USD);
  const data = response.data;
    
  if (data.error) {
    throw new Error(data.error);
  }
  
  const rate = data.rates.VND;
  const result = amount / rate;
  return result.toFixed(2);
}