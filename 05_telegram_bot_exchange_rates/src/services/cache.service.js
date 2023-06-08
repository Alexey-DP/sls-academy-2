import NodeCache from "node-cache";
import BankService from "./bank.service.js";

export default class CacheService {
  timeToCache = 3 * 60;
  nodeCache = new NodeCache({ stdTTL: this.timeToCache });
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
    if (value) {
      this.nodeCache.set(key, value);
    }
  }

  isCacheHas(key) {
    return this.nodeCache.has(key);
  }

  getManyFromCache(arrKeys) {
    return this.nodeCache.mget(arrKeys);
  }
}
