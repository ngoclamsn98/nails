export const numberWithCommas = (number: Number) => {
  if (!number) return 0;
  return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
