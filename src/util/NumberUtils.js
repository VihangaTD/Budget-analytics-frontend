export const addThousandsSeparator = (value) => {
  if (value === null || value === undefined) return "";

  // Convert to string (handles both numbers and strings)
  const strValue = String(value).trim();

  // Split integer and fractional parts
  const [integerPart, fractionalPart] = strValue.split(".");

  // Add commas to integer part (U.S. numbering system)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine integer and fractional parts
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
