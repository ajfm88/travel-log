// Problem 2 — Filtering & Counting
// Fetch all todos from https://jsonplaceholder.typicode.com/todos and print a
// summary per user showing how many todos they have total and how many are completed.
// Output should look like:
// User 1: 20 total, 11 completed
// User 2: 20 total, 8 completed
// ...

const axios = require("axios");

async function main() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
    );

    const userStats = data.reduce((acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = { totalTodos: 0, completedTodos: 0 };
      }
      acc[item.userId].totalTodos++;
      if (item.completed) {
        acc[item.userId].completedTodos++;
      }
      return acc;
    }, {});

    for (const [key, value] of Object.entries(userStats)) {
      console.log(
        `User ${key}: ${value.totalTodos} total, ${value.completedTodos} completed`,
      );
    }
  } catch (err) {
    console.error("Error is: ", err);
  }
}

main();
