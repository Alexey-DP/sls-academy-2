import axios from "axios";

export default class BankService {
  mbUrl = "https://api.monobank.ua/bank/currency";
  pbUrl = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  async getExchangeRatesFromMb() {
    try {
      const { data } = await axios.get(this.mbUrl);
      if (!data) return null;
      return this.normaliseMbResponse(data);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  async getExchangeRatesFromPb() {
    try {
      const { data } = await axios.get(this.pbUrl);
      if (!data) return null;
      return this.normalisePbResponse(data);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  normaliseMbResponse(data) {
    return data.slice(0, 2).reduce((prev, curr) => {
      const { currencyCodeA, rateBuy, rateSell } = curr;
      const currency = currencyCodeA === 840 ? "USD" : "EUR";
      prev[currency] = {
        ccy: currency,
        base_ccy: "UAH",
        buy: rateBuy.toFixed(2),
        sale: rateSell.toFixed(2),
        date: new Date(),
      };
      return prev;
    }, {});
  }

  normalisePbResponse(data) {
    return data.reduce((prev, curr) => {
      const { ccy, base_ccy, buy, sale } = curr;
      prev[ccy] = {
        ccy,
        base_ccy,
        buy: (+buy).toFixed(2),
        sale: (+sale).toFixed(2),
        date: new Date(),
      };
      return prev;
    }, {});
  }
}
