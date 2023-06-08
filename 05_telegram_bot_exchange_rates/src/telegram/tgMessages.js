export default {
  startMessage: (name) =>
    `Hello, ${name}!👋\nI can help you find out the exchange rates💸`,
  preferCurrency: "Which currency do you prefer more? 💰",
  preferBank: "Which bank do you prefer more? 🏦",
  sorry: "Something went wrong😕\n\nTry again😉",
  result: (currency, exchangeRates) =>
    `As of ${exchangeRates[currency].date.toLocaleString()}\n\n` +
    "💱EXCHANGE RATES:\n\n" +
    `For buy: 1 ${currency} = ${exchangeRates[currency].buy} UAH\n` +
    `For sale 1 ${currency} = ${exchangeRates[currency].sale} UAH\n\n` +
    "Was delighted to assist😊",
};
