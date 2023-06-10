console.time("\nFull Time");
import path from "path";
import { readFileSync, readdirSync } from "fs";

const getUniqueValuesAndExistInAllAndInAtleastTen = (filesPath) => {
  const files = readdirSync(filesPath);
  const uniqueNames = {};
  let amountUniqueNames = 0;
  let amountUniqueNamesInAll = 0;
  let amountUniqueNamesAtleastInTen = 0;

  for (let listIndex in files) {
    const fileName = files[listIndex];
    const filePath = path.join(filesPath, fileName);
    const namesList = readFileSync(filePath, "utf8").split("\n");
    const uniqueNamesInList = {};
    for (let name of namesList) {
      if (listIndex === 0 && !uniqueNames[name]) {
        uniqueNames[name] = 1;
        amountUniqueNames++;
        continue;
      }
      if (uniqueNamesInList[name]) {
        continue;
      }
      if (!uniqueNames[name] && !uniqueNamesInList[name]) {
        uniqueNames[name] = 1;
        uniqueNamesInList[name] = 1;
        amountUniqueNames++;
        continue;
      }
      if (uniqueNames[name]) {
        uniqueNamesInList[name] = 1;
        uniqueNames[name]++;
        if (uniqueNames[name] === 10) {
          amountUniqueNamesAtleastInTen++;
          continue;
        }
        if (uniqueNames[name] === files.length) {
          amountUniqueNamesInAll++;
        }
      }
    }
  }
  return {
    amountUniqueNames,
    amountUniqueNamesInAll,
    amountUniqueNamesAtleastInTen,
  };
};

const {
  amountUniqueNames,
  amountUniqueNamesInAll,
  amountUniqueNamesAtleastInTen,
} = getUniqueValuesAndExistInAllAndInAtleastTen("./files");
console.log(
  `\nuniqueValues => ${amountUniqueNames}` +
    `\nexistInAllFiles => ${amountUniqueNamesInAll}` +
    `\nexistInAtleastTen => ${amountUniqueNamesAtleastInTen}`
);
console.timeEnd("\nFull Time");
