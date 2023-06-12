export default class ApiService {
  constructor({ urls, searchedKey }) {
    this.apiUrls = urls;
    this.searchedKey = searchedKey;
  }

  async getApiResponse(url, requestCounter = 0) {
    if (requestCounter >= 3) {
      return null;
    }
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      return await this.getApiResponse(url, ++requestCounter);
    }
  }

  getDeepValueFromObjByKey(obj, searchedKey) {
    let foundValue = "not found";
    if (!obj || typeof obj !== "object" || obj instanceof Array) {
      return foundValue;
    }
    if (searchedKey in obj) {
      return obj[searchedKey];
    }
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        const result = this.getDeepValueFromObjByKey(obj[key], searchedKey);
        if (typeof result === "boolean") {
          foundValue = result;
          break;
        }
      }
    }
    return foundValue;
  }

  logSuccessMessage(url, value) {
    console.log(`[Success] ${url}: isDone - ${value}`);
  }

  logFailMessage(url) {
    console.log(`[Fail] ${url}: The endpoint is unavailable`);
  }

  async run() {
    let trueValues = 0;
    let falseValues = 0;

    try {
      for (let url of this.apiUrls) {
        const apiData = await this.getApiResponse(url);
        if (!apiData) {
          this.logFailMessage(url);
          continue;
        }
        const searchedValue = this.getDeepValueFromObjByKey(
          apiData,
          this.searchedKey
        );
        this.logSuccessMessage(url, searchedValue);
        if (searchedValue !== "not found") {
          searchedValue ? trueValues++ : falseValues++;
        }
      }

      console.log(`\nFound True values: ${trueValues}`);
      console.log(`Found False values: ${falseValues}`);
    } catch (error) {
      console.log(error.message);
    }
  }
}
