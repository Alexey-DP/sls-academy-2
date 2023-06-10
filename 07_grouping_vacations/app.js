const usersUrl = "https://jsonbase.com/sls-team/vacations";

const response = await fetch(usersUrl);
const originalData = await response.json();

const formatJSONdata = (data) => {
  const usersList = {};

  for (let userData of data) {
    const {
      user: { name: userName, _id: userId },
      startDate,
      endDate,
    } = userData;

    if (!usersList[userId]) {
      usersList[userId] = {
        userId,
        userName,
        vacations: [
          {
            startDate,
            endDate,
          },
        ],
      };
      continue;
    }

    usersList[userId].vacations.push({ startDate, endDate });
  }

  return JSON.stringify(Object.values(usersList));
};

console.log(formatJSONdata(originalData));
