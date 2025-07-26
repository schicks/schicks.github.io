const getFilename = (path) => path.split("/").pop();
const getPosts = async () => {
  const markdownFiles = /* @__PURE__ */ Object.assign({ "/src/routes/posts/better-pooled-coronavirus-testing.mdx": () => import("./better-pooled-coronavirus-testing.js"), "/src/routes/posts/deriving-derive-macros.mdx": () => import("./deriving-derive-macros.js"), "/src/routes/posts/koka-vs-the-world.mdx": () => import("./koka-vs-the-world.js"), "/src/routes/posts/pi-by-hand.mdx": () => import("./pi-by-hand.js"), "/src/routes/posts/release-announcement-req.mdx": () => import("./release-announcement-req.js"), "/src/routes/posts/representation-apis.mdx": () => import("./representation-apis.js"), "/src/routes/posts/static-rendering-in-sveltekit.mdx": () => import("./static-rendering-in-sveltekit.js"), "/src/routes/posts/type-safe-url-wrangling.mdx": () => import("./type-safe-url-wrangling.js"), "/src/routes/posts/typescript-tree-traversals.mdx": () => import("./typescript-tree-traversals.js"), "/src/routes/posts/visualizing-voting-systems.mdx": () => import("./visualizing-voting-systems.js") });
  const posts = (await Promise.all(
    Object.entries(markdownFiles).filter(([path]) => !(getFilename(path)?.startsWith("_") ?? true)).map(async ([path, page]) => {
      const { metadata, default: body } = await page();
      const blurb = metadata.blurb || body.render().html.split("\n").filter((node) => node.startsWith("<p"))[0];
      const filename = getFilename(path);
      const slug = filename.split(".md", 1)[0];
      return { ...metadata, slug, blurb, date: Date.parse(metadata.date) };
    })
  )).filter(({ status }) => status === "published");
  posts.sort((a, b) => b.date - a.date);
  return posts;
};
export {
  getPosts as g
};
