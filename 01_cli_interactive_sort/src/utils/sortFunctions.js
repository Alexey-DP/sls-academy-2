export default class SortFunctions {
  static sortAlphabetically(list) {
    return list
      .filter((item) => isNaN(item))
      .sort((a, b) => a.localeCompare(b));
  }

  static sortNumbersAscending(list) {
    return list.filter((item) => !isNaN(item)).sort((a, b) => a - b);
  }

  static sortNumbersDescending(list) {
    return list.filter((item) => !isNaN(item)).sort((a, b) => b - a);
  }

  static sortByWordLength(list) {
    return list
      .filter((item) => isNaN(item))
      .sort((a, b) => a.length - b.length);
  }

  static getUniqueWords(list) {
    return Array.from(new Set(list.filter((item) => isNaN(item))));
  }

  static getUniqueValues(list) {
    return Array.from(new Set(list));
  }
}
