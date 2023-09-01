export const convertToSimpleDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();
