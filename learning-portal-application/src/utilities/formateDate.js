const formateDate = (isoFormatDate) => {
  const date = new Date(isoFormatDate);
  const formated = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
  return formated;
};
export default formateDate;
