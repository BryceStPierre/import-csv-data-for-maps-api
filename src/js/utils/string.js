export const addressAsString = ({ address, city, province, postalCode, country }) => {
  return `${address}, ${city}, ${province} ${postalCode}, ${country}`;
}