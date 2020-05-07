export const addressAsString = ({
  address,
  city,
  province,
  postalCode,
  country,
}) => {
  return `${address}, ${city}, ${province} ${postalCode}, ${country}`;
};

export const jsonAsText = (json) => {
  let text = JSON.stringify(json, null, 1);
  text = text.replace("\n", "");
  text = text.replace("\r", "");
  return text;
};
