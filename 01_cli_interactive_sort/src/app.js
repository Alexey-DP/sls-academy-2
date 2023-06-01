import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import SortFunctions from './utils/sortFunctions.js';

class CliSortedApp {
  rl = createInterface({ input, output });

  async getListForSorted() {
    return (await this.rl.question(
      'Hello, my friend! I could help you to sort your list. Enter words or digits dividing them into spaces: '
    )).trim()
  }

  async getFormatOfSort() {
    return (await this.rl.question(
      'How would you like to sort values:\n' +
      '1. Words by name (from A to Z)\n' +
      '2. Show digits from the smaller\n' +
      '3. Show digits from the biggest\n' +
      '4. Words by quantity of letters\n' +
      '5. Show only unique words\n' +
      '6. Show only unique values from the set of words and digits\n\n' +
      'Enter your choice (1-6): '
    )).trim();
  }

  async getSortedList(list) {
    const formateOfSort = await this.getFormatOfSort();
    switch (formateOfSort) {
      case "exit":
        return "exit";
      case "1":
        return SortFunctions.sortAlphabetically(list);
      case "2":
        return SortFunctions.sortNumbersAscending(list);
      case "3":
        return SortFunctions.sortNumbersDescending(list);
      case "4":
        return SortFunctions.sortByWordLength(list);
      case "5":
        return SortFunctions.getUniqueWords(list);
      case "6":
        return SortFunctions.getUniqueValues(list);
      default:
        return "invalid";
    }
  }

  closeApp(value) {
      console.log('\nBye! See you later :)');
      return this.rl.close();
  }

  async init() {
    const answer = await this.getListForSorted();
    if (answer === "exit") return this.closeApp();

    const list = answer.split(' ');
    let sortedList = await this.getSortedList(list);
    while (sortedList === "invalid" || sortedList === "exit") {
      if (sortedList === "exit") return this.closeApp();
      console.log('\nInvalid choice. Try again\n');
      sortedList = await this.getSortedList(list);
    }
    console.log(sortedList);
    this.init();
  }
}

new CliSortedApp().init();
