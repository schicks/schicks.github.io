import { c as create_ssr_component, v as validate_component, m as missing_component, e as escape, a as add_attribute } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(data.content || missing_component, "svelte:component").$$render($$result, {}, {}, {})}

${$$result.head += `<!-- HEAD_svelte-1l490sv_START -->${data.meta.title ? `${$$result.title = `<title>${escape(data.meta.title)}</title>`, ""}` : ``}${data.meta.description ? `<meta name="description"${add_attribute("content", data.meta.description, 0)}>` : ``}<!-- HEAD_svelte-1l490sv_END -->`, ""}`;
});
export {
  Page as default
};
