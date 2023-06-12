const usersUrl = "https://jsonbase.com/sls-team/vacations";

const formatJSONdata = (data) => {
  const usersList = data.reduce((prev, curr) => {
    const {
      user: { name: userName, _id: userId },
      startDate,
      endDate,
    } = curr;

    !prev[userId]
      ? (prev[userId] = {
          userId,
          userName,
          vacations: [
            {
              startDate,
              endDate,
            },
          ],
        })
      : prev[userId].vacations.push({ startDate, endDate });
    return prev;
  }, {});
  return JSON.stringify(Object.values(usersList));
};

try {
  const response = await fetch(usersUrl);
  const originalData = await response.json();
  console.log(formatJSONdata(originalData));
} catch (error) {
  console.log(error.message);
}
