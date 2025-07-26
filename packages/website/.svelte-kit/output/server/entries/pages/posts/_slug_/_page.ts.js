import { e as error } from "../../../../chunks/index2.js";
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const load = async ({ params }) => {
  try {
    const post = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../better-pooled-coronavirus-testing.mdx": () => import("../../../../chunks/better-pooled-coronavirus-testing.js"), "../deriving-derive-macros.mdx": () => import("../../../../chunks/deriving-derive-macros.js"), "../koka-vs-the-world.mdx": () => import("../../../../chunks/koka-vs-the-world.js"), "../pi-by-hand.mdx": () => import("../../../../chunks/pi-by-hand.js"), "../release-announcement-req.mdx": () => import("../../../../chunks/release-announcement-req.js"), "../representation-apis.mdx": () => import("../../../../chunks/representation-apis.js"), "../static-rendering-in-sveltekit.mdx": () => import("../../../../chunks/static-rendering-in-sveltekit.js"), "../type-safe-url-wrangling.mdx": () => import("../../../../chunks/type-safe-url-wrangling.js"), "../typescript-tree-traversals.mdx": () => import("../../../../chunks/typescript-tree-traversals.js"), "../visualizing-voting-systems.mdx": () => import("../../../../chunks/visualizing-voting-systems.js") }), `../${params.slug}.mdx`);
    return {
      content: post.default,
      meta: post.metadata || {}
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
};
export {
  load
};
