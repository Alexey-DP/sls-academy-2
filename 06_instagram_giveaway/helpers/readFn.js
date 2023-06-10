import path from "path";
import { readFileSync, readdirSync } from "fs";

export default class FileService {
  static readFiles(filesPath) {
    const files = readdirSync(filesPath);
    const namesCollection = [];

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(filesPath, files[i]);
      const namesList = readFileSync(filePath, "utf8").split("\n");
      namesCollection.push(namesList);
    }
    return namesCollection;
  }
}
