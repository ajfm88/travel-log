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
    // fetch all todos and destructure data from the axios response
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
    );

    // reduce transforms the array into a single object grouped by userId
    // acc (accumulator) starts as an empty object {}
    // each iteration adds to it and returns it for the next iteration
    const totalToDos = data.reduce((acc, item) => {
      // if this userId doesn't exist in acc yet, create it
      // with counters starting at 0
      if (!acc[item.userId]) {
        acc[item.userId] = {
          totalTodos: 0,
          completed: 0,
        };
      }

      // increment total todos for this user on every iteration
      acc[item.userId].totalTodos++;

      // only increment completed if the todo's completed property is true
      if (item.completed) {
        acc[item.userId].completed++;
      }

      // must return acc so the next iteration receives the updated object
      return acc;
    }, {}); // {} is the initial value of acc

    // Object.entries() converts the object into an array of [key, value] pairs
    // so we can loop over it with for...of
    // key = userId, value = { totalTodos, completed }
    for (const [key, value] of Object.entries(totalToDos)) {
      console.log(
        `User ${key}: Total ToDos: ${value.totalTodos}, Completed: ${value.completed}`,
      );
    }
  } catch (err) {
    // catch any errors from the request or data manipulation
    console.error("Error: ", err);
  }
}

// call the function to run it
main();
