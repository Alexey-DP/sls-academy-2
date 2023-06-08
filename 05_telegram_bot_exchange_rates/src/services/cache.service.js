import NodeCache from "node-cache";
import BankService from "./bank.service.js";

export default class CacheService {
  nodeCache = new NodeCache();
  bankService = new BankService();

  async setMbExchangeRatesToCache() {
    try {
      const mbExchangeRates = await this.bankService.getExchangeRatesFromMb();
      if (mbExchangeRates) {
        this.nodeCache.set("mb", mbExchangeRates);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async setPbExchangeRatesToCache() {
    try {
      const pbExchangeRates = await this.bankService.getExchangeRatesFromPb();
      if (pbExchangeRates) {
        this.nodeCache.set("pb", pbExchangeRates);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  setToCache(key, value) {
    this.nodeCache.set(key, value);
  }

  getFromCache(key) {
    return this.nodeCache.get(key);
  }
}
