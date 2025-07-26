import { c as create_ssr_component, v as validate_component } from "./index.js";
import { l as loadVegaLiteCharts } from "./utilities.js";
import { B as Blog } from "./blog.js";
const metadata = {
  "title": "Static rendering in Sveltekit",
  "date": "2021-06-15T10:44:30.000Z",
  "status": "published",
  "blurb": "Sveltekit endpoints can shift chart rendering from runtime to compile time for more accessible websites."
};
const chart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Google's stock price over time.",
  "data": {
    "url": "https://raw.githubusercontent.com/vega/vega/master/docs/data/stocks.csv"
  },
  "transform": [{ "filter": "datum.symbol==='GOOG'" }],
  "mark": "line",
  "encoding": {
    "x": { "field": "date", "type": "temporal" },
    "y": { "field": "price", "type": "quantitative" }
  }
};
const load = loadVegaLiteCharts({ chart });
const Static_rendering_in_sveltekit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { chart: chart2 } = $$props;
  if ($$props.chart === void 0 && $$bindings.chart && chart2 !== void 0)
    $$bindings.chart(chart2);
  return `${validate_component(Blog, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<p><a href="https://kit.svelte.dev/doc" rel="nofollow">Sveltekit</a> is pretty neat. I just rewrote <a href="https://github.com/schicks/schicks.github.io" rel="nofollow">this blog</a> in it, mostly for fun but also because I was getting tired of how absurdly slow Gatsby was. One of the coolest things about it is how easy it was to set up in a way that would work even if the end user didn’t have javascript. Mostly, this was trivial, but getting <a href="https://vega.github.io/vega/usage/" rel="nofollow">Vega graphs</a> to render at compile time was a little tricky.</p>
<p>Vega works by taking a JSON specification of a visualization and converting it into HTML. In general, this can’t be done statically, because the visualizations can involve interactivity or simulation, but in most cases that I’ve run into the graph I was trying to produce was in fact static. Creating a <a href="https://github.com/schicks/schicks.github.io/blob/main/src/components/VegaLite.svelte" rel="nofollow">component</a> that would render such vega charts with javascript was simple, but when javascript was unavailable all it would ever show was the fallback text. In keeping with the framework-as-a-compiler mindset of Svelte, it seemed like we should be able to do better.</p>
<p><a href="https://kit.svelte.dev/docs#routing" rel="nofollow">Sveltekit endpoints</a> represent code that will run on the “server” and return some data. When using Sveltekit to produce a static site, this means that they run at build time and produce some static result. By setting up an endpoint which returns an image URL of our vega charts, we can get the charts to be rendered to a static image at compile time and embedded in that form into the blog.</p>
<!-- HTML_TAG_START -->${chart2}<!-- HTML_TAG_END -->
<p><em>This chart is statically rendered! if you disable javascript you’ll still be able to see it.</em></p>
<p>There are real costs to this approach from an ergonomics perspective however. Rather than being able to put the vega specifications inline where the chart will be rendered, they instead need to be specified in a <a href="https://github.com/schicks/schicks.github.io/blob/main/src/routes/posts/static-rendering-in-sveltekit.mdx" rel="nofollow">module level script</a>, and then pulled in as props in an instance level script. The inline part then becomes an <code>@html</code> directive, which still gives me scary <code>dangerouslySetInnerHTML</code> feelings.</p>
<p>The <a href="https://github.com/schicks/schicks.github.io/blob/main/src/utilities.ts" rel="nofollow">utility</a> for fetching the rendered charts is also significantly harder to read than the original <a href="https://github.com/schicks/schicks.github.io/blob/main/src/components/VegaLite.svelte" rel="nofollow">Svelte component</a>. In a personal learning project, this complexity is something I’m willing to accept, but in a production space I’d want real evidence that javascript free pages were of value before implementing something like this.</p>`;
    }
  })}`;
});
export {
  Static_rendering_in_sveltekit as default,
  load,
  metadata
};
