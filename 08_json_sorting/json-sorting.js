import ApiService from "./services/api.service.js";
import apiUrls from "./urls/api-urls.js";

await new ApiService({
  urls: apiUrls,
  searchedKey: "isDone",
}).run();
