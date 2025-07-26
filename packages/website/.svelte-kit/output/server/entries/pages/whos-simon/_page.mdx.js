import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import { B as Blog } from "../../../chunks/blog.js";
const metadata = { "title": "Who's Simon?" };
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Blog, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<p>My name is not Simon. I’m <a href="/resume">Sam Schick</a>, a staff software engineer at <a href="https://www.cityblock.com/about" rel="nofollow">Cityblock Health</a>. </p>
<p>Simon is my older brother. I’ve never met him, but from what my parents have told me he is brave and outspoken, though also somewhat reckless. If I got close to a river they would say, “Stay away from the water or the crocodiles will get you. That’s what happened to Simon.” If I was being loud at the grocery store they would say, “If you don’t calm down we’re going to leave you here to fend for yourself. That’s what happened to Simon.”</p>
<p>Needless to say, I have always looked up to Simon, and often when I’m not sure what to do I ask myself; what would Simon say?</p>`;
    }
  })}`;
});
export {
  Page as default,
  metadata
};
