import { c as create_ssr_component, e as escape, d as spread, f as escape_object } from "./index.js";
const prismOkaidia = "";
const katex_min = "";
const blog_svelte_svelte_type_style_lang = "";
const css = {
  code: "article.blog ol li{margin-bottom:20px}article.blog blockquote{border-left:4px solid black;padding:1px 20px;margin-left:10px;background-color:rgba(0, 0, 0, 0.05);border-radius:3px}",
  map: null
};
const Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  const commentProps = {
    repo: "schicks/schicks.github.io",
    "issue-term": title,
    label: "blog-comments",
    theme: "preferred-color-scheme",
    crossorigin: "anonymous",
    async: true
  };
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<article class="blog"><h2>${escape(title)}</h2>
  ${slots.default ? slots.default({}) : ``}</article>

${`<script${spread([{ src: "https://utteranc.es/client.js" }, escape_object(commentProps)], {})}><\/script>`}`;
});
export {
  Blog as B
};
