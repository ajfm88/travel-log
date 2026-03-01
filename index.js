// Problem 3 — Chained Requests
// Fetch all posts from https://jsonplaceholder.typicode.com/posts,
// then for the first 5 posts only, fetch their comments from
// https://jsonplaceholder.typicode.com/comments?postId={id} and print
// each post's title along with how many comments it has.
const axios = require("axios");

async function main() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );

    const slicedArray = data.slice(0, 5);

    const commentsFromFirstFive = await Promise.all(
      slicedArray.map(async (post) => {
        const { data: comments } = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`,
        );
        return comments;
      }),
    );

    slicedArray.forEach((post, index) => {
      console.log(
        `"${post.title}" - ${commentsFromFirstFive[index].length} comments`,
      );
    });
  } catch (err) {
    console.error("Error is: ", err);
  }
}

main();
