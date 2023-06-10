export default class Search {
  static uniqueValues(namesCollection) {
    const uniqueNames = {};
    let amountUniqueNames = 0;
    namesCollection.forEach((namesList) => {
      namesList.forEach((name) => {
        if (!uniqueNames[name]) {
          uniqueNames[name] = 1;
          amountUniqueNames++;
        }
      });
    });
    return amountUniqueNames;
  }

  static existInAllFiles(namesCollection) {
    const amountUniqueNames = {};
    let amountUniqueNamesInAllCollection = 0;
    namesCollection.forEach((namesList, listIndex) => {
      const uniqueNamesInList = {};
      namesList.forEach((name) => {
        if (listIndex === 0) {
          amountUniqueNames[name] = 1;
          return;
        }
        if (!amountUniqueNames[name] || uniqueNamesInList[name]) {
          return;
        }

        uniqueNamesInList[name] = 1;
        amountUniqueNames[name]++;

        if (amountUniqueNames[name] === namesCollection.length) {
          amountUniqueNamesInAllCollection++;
        }
      });
    });
    return amountUniqueNamesInAllCollection;
  }

  static existInAtleastTen(namesCollection) {
    const amountUniqueNames = {};
    let amountUniqueNamesAtleastInTenLists = 0;
    namesCollection.forEach((namesList, listIndex) => {
      const uniqueNamesInList = {};
      namesList.forEach((name) => {
        if (listIndex === 0) {
          amountUniqueNames[name] = 1;
          return;
        }
        if (uniqueNamesInList[name]) {
          return;
        }
        if (!amountUniqueNames[name] && !uniqueNamesInList[name]) {
          amountUniqueNames[name] = 1;
          uniqueNamesInList[name] = 1;
          return;
        }
        if (amountUniqueNames[name]) {
          uniqueNamesInList[name] = 1;
          amountUniqueNames[name]++;
          if (amountUniqueNames[name] === 10) {
            amountUniqueNamesAtleastInTenLists++;
          }
          return;
        }
      });
    });
    return amountUniqueNamesAtleastInTenLists;
  }
}
