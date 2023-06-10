console.time("\nFull Time");
import FileService from "./helpers/readFn.js";
import Search from "./helpers/searchFn.js";

console.time("\nFiles reading time");
const namesCollection = FileService.readFiles("./files");
console.timeEnd("\nFiles reading time");

//----------------------------

console.time("Time");
const resUniqueValues = Search.uniqueValues(namesCollection);
console.log(`\nResult 'uniqueValues()' => ${resUniqueValues}`);
console.timeEnd("Time");

//----------------------------

console.time("Time");
const resExistInAllFiles = Search.existInAllFiles(namesCollection);
console.log(`\nResult 'existInAllFiles()' => ${resExistInAllFiles}`);
console.timeEnd("Time");

//----------------------------

console.time("Time");
const resExistInAtleastTen = Search.existInAtleastTen(namesCollection);
console.log(`\nResult 'existInAtleastTen()' => ${resExistInAtleastTen}`);
console.timeEnd("Time");

console.timeEnd("\nFull Time");
