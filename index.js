// Problem 2 — Filtering & Counting (lodash groupBy version)
// Fetch all todos from https://jsonplaceholder.typicode.com/todos and print a
// summary per user showing how many todos they have total and how many are completed.

const axios = require("axios");
const _ = require("lodash");

async function main() {
  try {
    // fetch all todos and destructure data from the axios response
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
    );

    // _.groupBy groups the array into an object of arrays
    // keyed by the userId property
    // result looks like: { '1': [{...}, {...}], '2': [{...}, {...}] }
    const grouped = _.groupBy(data, "userId");

    // Object.entries converts the object into [key, value] pairs
    // key = userId, value = array of todos belonging to that user
    for (const [userId, todos] of Object.entries(grouped)) {
      // todos is an array so we can use .length to get the total
      const totalTodos = todos.length;

      // filter returns a new array of only completed todos
      // then .length gives us the count
      const completedTodos = todos.filter((todo) => todo.completed).length;

      console.log(
        `User ${userId}: ${totalTodos} total, ${completedTodos} completed`,
      );
    }
  } catch (err) {
    console.error("Error is: ", err);
  }
}

// call the function to run it
main();
