import { c as create_ssr_component } from "../../../chunks/index.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".body.svelte-1gry92p{padding:0 20px 20px 20px;max-width:800px;margin:0 auto}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="body svelte-1gry92p">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
