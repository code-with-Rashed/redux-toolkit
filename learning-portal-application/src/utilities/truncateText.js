const tuncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  let truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    truncated = truncated.slice(0, lastSpace);
  }
  return truncated + "...";
};
export default tuncateText;
