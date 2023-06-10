export default {
  startMessage: (name) =>
    `Hello, ${name}!👋\nI can help you find out the exchange rates💸`,
  preferCurrency: "Which currency do you prefer more? 💰",
  sorry: "Something went wrong😕\n\nTry again😉",
  result: (currency, exchangeRates) => {
    if (!exchangeRates) {
      return "Server is not available right now 😕\n\n";
    }
    return (
      `As of ${exchangeRates[currency].date.toLocaleString()}\n\n` +
      `For buy: 1 ${currency} = ${exchangeRates[currency].buy} UAH\n` +
      `For sale: 1 ${currency} = ${exchangeRates[currency].sale} UAH\n\n`
    );
  },
};
