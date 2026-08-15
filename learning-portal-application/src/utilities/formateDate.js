const formateDate = (isoFormatDate) => {
  const date = new Date(isoFormatDate);
  const formated = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formated;
};
export default formateDate;
