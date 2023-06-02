import { fileURLToPath } from "url";
import path from "path";
import inquirer from "inquirer";
import { appendFileSync, readFileSync } from "fs";

class UsersDb {
  databaseFile = "users.txt";
  __dirname = path.dirname(fileURLToPath(import.meta.url));
  dbPath = path.join(this.__dirname, this.databaseFile);

  async getUserFromInput() {
    const user = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the user's name (or press ENTER to exit):",
        filter: (input) => input.trim(),
      },
      {
        type: "list",
        name: "gender",
        message: "Select the user's gender:",
        choices: ["Male", "Female", "Other"],
        when: (answers) => answers.name !== "",
      },
      {
        type: "input",
        name: "age",
        message: "Enter the user's age:",
        validate: (input) => {
          const age = parseInt(input);
          if (isNaN(age) || age <= 0 || age > 100)
            return "Age should be a number and between 1 and 100";
          return true;
        },
        filter: (input) => input.trim(),
        when: (answers) => answers.name !== "",
      },
    ]);
    return { ...user, age: parseInt(user.age) };
  }

  async saveUser(user) {
    try {
      const userToDb = JSON.stringify(user) + ",";
      appendFileSync(this.dbPath, userToDb, "utf-8");
      console.log(`New user ${user.name} added successfully`);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getSearchedUserData() {
    return await inquirer.prompt([
      {
        type: "confirm",
        name: "performSearch",
        message: "Would you like to search for some users in DB?",
        default: "Y",
      },
      {
        type: "input",
        name: "searchName",
        message:
          "Enter the name of the user to search for (or 'all' to get all users):",
        filter: (input) => input.trim().toLowerCase(),
        when: (answers) => answers.performSearch === true,
      },
    ]);
  }

  async searchUsersByName(userName) {
    try {
      const data = readFileSync(this.dbPath, "utf8");
      const allUsers = JSON.parse(`[${data.slice(0, -1)}]`);
      if (userName === "all") return allUsers;

      return allUsers.filter((user) => user.name.toLowerCase() === userName);
    } catch (error) {
      console.log(error.message);
    }
  }

  async init() {
    try {
      const candidate = await this.getUserFromInput();

      if (candidate.name !== "") {
        await this.saveUser(candidate);
        return this.init();
      }

      const { performSearch, searchName } = await this.getSearchedUserData();
      if (!performSearch) return console.log("\nBye! See you later :)");

      const foundUsers = await this.searchUsersByName(searchName);

      if (foundUsers.length <= 0) return console.log("\nUsers not found");

      console.log("\nSearch successful!\n");
      return console.table(foundUsers);
    } catch (error) {
      console.log(error.message);
    }
  }
}

new UsersDb().init();
