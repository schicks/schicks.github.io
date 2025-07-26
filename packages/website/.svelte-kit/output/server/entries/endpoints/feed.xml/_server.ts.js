import { g as getPosts } from "../../../chunks/getPosts.js";
const prerender = true;
const url = "schicks.github.io";
const xmlFeed = (posts) => `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>Simon would have said</title>
    <link>${url}</link>
    ${posts.map(
  (post) => `
      <item>
        <title>${post.title}</title>
        <link>${url}/${post.slug}</link>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>
    `
).join("\n")}
  </channel>
</rss>`;
const GET = async () => {
  const posts = await getPosts();
  return new Response(xmlFeed(posts), {
    headers: { "content-type": "application/rss+xml" }
  });
};
export {
  GET,
  prerender
};
