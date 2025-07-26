import { g as getPosts } from "../../chunks/getPosts.js";
const load = async () => {
  const posts = await getPosts();
  return {
    posts
  };
};
export {
  load
};
