const amountFormat = (amount) => {
  const amountNumber = Number(amount);
  const formatedAmount = amountNumber.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
  });
  return formatedAmount;
};
export default amountFormat;
