import { c as create_ssr_component, b as each, a as add_attribute, e as escape } from "../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "ul.svelte-157vlsl.svelte-157vlsl{list-style:none}li.svelte-157vlsl.svelte-157vlsl{padding-left:0}li.svelte-157vlsl a.svelte-157vlsl{text-decoration:none}li.svelte-157vlsl :hover h2.svelte-157vlsl{text-decoration:underline}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let posts;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ posts } = data);
  return `<ul class="svelte-157vlsl">${each(posts, (post) => {
    return `<li class="svelte-157vlsl"><a${add_attribute("href", `posts/${post.slug}`, 0)} class="svelte-157vlsl"><h2 class="svelte-157vlsl">${escape(post.title)}</h2>
        <!-- HTML_TAG_START -->${post.blurb}<!-- HTML_TAG_END --></a>
    </li>`;
  })}
</ul>`;
});
export {
  Page as default
};
