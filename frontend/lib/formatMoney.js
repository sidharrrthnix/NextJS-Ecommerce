export default function formatMoney(amount = 0) {
  const formatter = Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  });
  return formatter.format(amount / 100);
}
