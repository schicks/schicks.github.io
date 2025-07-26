import { c as create_ssr_component, a as add_attribute } from "../../chunks/index.js";
const rss = "/_app/immutable/assets/rss-5e9f88af.svg";
const home = "/_app/immutable/assets/cottage-a5c14d1f.svg";
const github = "/_app/immutable/assets/github-54cde8ee.svg";
const linkedin = "/_app/immutable/assets/linkedin-78909844.svg";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-18lm2j2.svelte-18lm2j2{margin:0}header.svelte-18lm2j2.svelte-18lm2j2{border-bottom:8px solid black;display:flex;align-items:center;justify-content:space-between;padding:0 1.45rem;min-height:70px;margin-bottom:1.45rem}@media(max-width: 800px){header.svelte-18lm2j2 .big.svelte-18lm2j2{display:none}header.svelte-18lm2j2 .small.svelte-18lm2j2{display:inline !important}}header.svelte-18lm2j2 a.svelte-18lm2j2{text-decoration:none}header.svelte-18lm2j2 .links.svelte-18lm2j2{font-size:20px;font-weight:600;margin-top:10px}header.svelte-18lm2j2 .links img.svelte-18lm2j2{position:relative;top:7px}header.svelte-18lm2j2 .links span.svelte-18lm2j2{padding:0 5px 0 0;border-right:2px solid black;margin:0}header.svelte-18lm2j2 .links span.svelte-18lm2j2:last-child{border-right:0}header.svelte-18lm2j2 .links span a.svelte-18lm2j2{padding-bottom:5px}header.svelte-18lm2j2 .links span a.svelte-18lm2j2:hover{border-bottom:2px solid black}header.svelte-18lm2j2 .links .small.svelte-18lm2j2{display:none}.body.svelte-18lm2j2.svelte-18lm2j2{padding:0 20px 20px 20px;max-width:800px;margin:0 auto}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="svelte-18lm2j2"><a href="/" class="big svelte-18lm2j2"><h1 class="svelte-18lm2j2">Simon would have said</h1></a>
  <div class="links svelte-18lm2j2"><span class="big svelte-18lm2j2"><a href="/resume" class="svelte-18lm2j2">Resume</a></span>
    <span class="big svelte-18lm2j2"><a href="/whos-simon" class="svelte-18lm2j2">Who&#39;s Simon? </a></span>
    <span class="small svelte-18lm2j2"><a href="/" class="svelte-18lm2j2"><img${add_attribute("src", home, 0)} alt="Back to index" class="svelte-18lm2j2"></a></span>
    <span class="svelte-18lm2j2"><a href="https://github.com/schicks" class="svelte-18lm2j2"><img${add_attribute("src", github, 0)} alt="Github" style="height: 24px" class="svelte-18lm2j2"></a></span>
    <span class="svelte-18lm2j2"><a href="https://www.linkedin.com/in/sam-schick-868ab8ab/" class="svelte-18lm2j2"><img${add_attribute("src", linkedin, 0)} alt="Linkedin" style="height: 24px" class="svelte-18lm2j2"></a></span>
    <span class="svelte-18lm2j2"><a href="/feed.xml" class="svelte-18lm2j2"><img${add_attribute("src", rss, 0)} alt="rss feed" class="svelte-18lm2j2"></a></span></div></header>
<div class="body svelte-18lm2j2">${slots.default ? slots.default({}) : ``}
</div>`;
});
export {
  Layout as default
};
