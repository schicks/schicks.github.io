import { c as create_ssr_component, e as escape, a as add_attribute, v as validate_component } from "./index.js";
import { B as Blog } from "./blog.js";
import { scaleLinear, scaleOrdinal, select } from "d3";
const Pegboard_svelte_svelte_type_style_lang = "";
const css = {
  code: "svg.svelte-12pn6ac{width:80%;height:auto;margin:0 auto;display:block;border:1px solid black}",
  map: null
};
const marginTop = 5;
const marginRight = 5;
const marginBottom = 5;
const marginLeft = 5;
const Pegboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let axisLength2;
  let viewboxWidth;
  let viewboxHeight;
  let x;
  let y;
  let c;
  let { data } = $$props;
  let group;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  axisLength2 = Math.sqrt(data.length);
  viewboxWidth = axisLength2 * 5 + marginLeft + marginRight;
  viewboxHeight = axisLength2 * 5 + marginTop + marginBottom;
  x = scaleLinear().domain([0, axisLength2]).nice().range([marginRight, viewboxWidth - marginLeft]);
  y = scaleLinear().domain([0, axisLength2]).nice().range([viewboxHeight - marginBottom, marginTop]);
  c = scaleOrdinal().domain([void 0, true, false]).range(["white", "red", "blue"]);
  {
    {
      select(group).selectAll("circle").data(data).join("circle").attr("cx", (d) => x(d.x)).attr("cy", (d) => y(d.y)).attr("r", 2).attr("fill", (d) => c(d.in));
    }
  }
  return `<svg viewBox="${"0 0 " + escape(viewboxWidth, true) + " " + escape(viewboxHeight, true)}" class="svelte-12pn6ac"><g${add_attribute("this", group, 0)}></g></svg>`;
});
const Darts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pi;
  let { axisLength: axisLength2 } = $$props;
  let data = new Array(axisLength2 ** 2).fill(0).map((_, i) => ({
    x: i % axisLength2,
    y: Math.floor(i / axisLength2)
  }));
  if ($$props.axisLength === void 0 && $$bindings.axisLength && axisLength2 !== void 0)
    $$bindings.axisLength(axisLength2);
  pi = 4 * data.filter((el) => el.in).length / data.filter((el) => el.in !== void 0).length;
  return `${validate_component(Pegboard, "Pegboard").$$render($$result, { data }, {}, {})}
<p>Approximate value of pi: ${escape(pi)}</p>`;
});
const Sequential = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pi;
  let { axisLength: axisLength2 } = $$props;
  let data = new Array(axisLength2 ** 2).fill(0).map((_, i) => ({
    x: i % axisLength2,
    y: Math.floor(i / axisLength2)
  }));
  if ($$props.axisLength === void 0 && $$bindings.axisLength && axisLength2 !== void 0)
    $$bindings.axisLength(axisLength2);
  pi = 4 * data.filter((el) => el.in).length / data.filter((el) => el.in !== void 0).length;
  return `${validate_component(Pegboard, "Pegboard").$$render($$result, { data }, {}, {})}
<p>Approximate value of pi: ${escape(pi)}</p>`;
});
const BinarySearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pi;
  let { axisLength: axisLength2 } = $$props;
  let data = new Array(axisLength2 ** 2).fill(0).map((_, i) => ({
    y: i % axisLength2,
    x: Math.floor(i / axisLength2)
  }));
  if ($$props.axisLength === void 0 && $$bindings.axisLength && axisLength2 !== void 0)
    $$bindings.axisLength(axisLength2);
  pi = 4 * data.filter((el) => el.in).length / data.filter((el) => el.in !== void 0).length;
  return `${validate_component(Pegboard, "Pegboard").$$render($$result, { data }, {}, {})}
<p>Approximate value of pi: ${escape(pi)}</p>`;
});
const metadata = {
  "title": "Pi By Hand",
  "date": "2024-03-16T09:45:32.000Z",
  "status": "draft",
  "blurb": "Calculating pi by hand requires a method that can be split over as many people as possible."
};
let axisLength = 64;
const Pi_by_hand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Blog, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<p>Happy Pi Day!</p>
<p>Alright, I’m a little late. I have a new kid, cut me some slack.</p>
<p>On <em>actual</em> pi day my cousin sent me a <a href="https://youtu.be/LIg-6glbLkU?si=o5g2RMM7ocy2JghO" rel="nofollow">video</a> discussing Matt Parker and friends attempt to break the world record for the most digits of pi calculated by hand. To make it possible for a big group of people to work together on the problem, they were using a <a href="https://en.wikipedia.org/wiki/Machin-like_formula" rel="nofollow">Machin-like formula</a> which breaks into 7 independent terms. This means that 7 groups of people can work independently and addd up their results at the end to get pi. </p>
<p>7 way parallelism is great, but to get to the full potential of a big group of people (they had 200 people working together on this) it seems like we want a method where we can choose the degree of parallelism to match our available resources.</p>
<p>What we are looking for is a method for calculating pi that;</p>
<ol><li>we split into arbitrarily many independent calculations</li>
<li>only involves arithmetic that is easy to do by hand</li>
<li>could reasonably get to 528 digits (breaking the current record)</li></ol>
<p>The problem made me think of an old <a href="https://github.com/apache/spark/blob/master/examples/src/main/python/pi.py" rel="nofollow">spark example</a> that calculated pi with as much parallelism as you had to throw at it. The idea was to imagine a diagram of a circle inscribed in a square.</p>
<svg viewBox="0 0 100 100" style="width: 80%; margin: 0 auto; display: block"><rect width="100" height="100" fill="blue"></rect><circle cx="50" cy="50" r="50" fill="red"></circle></svg>
<p>We know that the circle has area <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>π</mi><msup><mi>r</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">\\pi r^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">π</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span> and the square has area <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>4</mn><msup><mi>r</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">4 r^2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord">4</span><span class="mord"><span class="mord mathnormal" style="margin-right:0.02778em;">r</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span></span></span></span></span> (since the edge of the square is the diameter of the circle.) Then the ratio of the area of the circle to the square is:</p>

<p>The spark demo worked by selecting random points in the square and checking if they were also in the circle. The ratio of points in the circle to all points checked so far approximated pi. This is technically a <a href="https://en.wikipedia.org/wiki/Monte_Carlo_method" rel="nofollow">Monte Carlo simulation</a>; the Wikipedia article even uses a diagram like the one below as an example.</p>
<p>We can do the same thing with a quarter of the diagram, since it contains both a quarter of the circle and a quarter of the square. This is convenient for a few reasons that we’ll discuss later.</p>
${validate_component(Darts, "Darts").$$render($$result, { axisLength }, {}, {})}
<p>This seems to work, but if we want to do this by hand finding a <a href="https://hillelwayne.com/post/randomness/" rel="nofollow">random number generator that runs on your brain</a> is actually fairly hard. We certainly wouldn’t be able to calculate very precise random numbers, so (like in the diagram above), we’d end up with a “pixelated” version of the problem, which limits our precision.</p>
<p>But if we accept the pixelation for now, we can remove the randomness by just iterating over all of the pixels and checking them.</p>
${validate_component(Sequential, "Sequential").$$render($$result, { axisLength }, {}, {})}
<p>This doesn’t have any parallelism because javascript is single threaded, but we could parallelize it by splitting the document into blocks and working on each block independently. So then how many pixels would we need to check to break the record?</p>
<p>We want the error of our calculation to be less than <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn><msup><mn>0</mn><mrow><mo>−</mo><mn>528</mn></mrow></msup></mrow><annotation encoding="application/x-tex">10^${escape(-528)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord">1</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mtight">528</span></span></span></span></span></span></span></span></span></span></span></span></span>. Based on the monte carlo calculation using the formula for the standard error of a set of bernoulli trials, we get;</p>

<p>According to DuckDuckGo, that comes out to…</p>
<img alt="calculator showing the result to be infinity" style="max-width: 80%; margin: 0 auto;" src="/duckduckgo-infinity.png">
<p>Huh. Ok, that probably won’t work out for us.</p>
<p>We need to get more information out of each calculation we do. This is where using a quarter of the diagram comes in handy.</p>
<p>Think about each column of pixels. If we can find the point where the edge of the circle is, we know that every pixel below that is in the circle. So rather than check every pixel, we can go column by column and do a <a href="https://en.wikipedia.org/wiki/Binary_search_algorithm" rel="nofollow">binary search</a> to find the last pixel within the circle.</p>
<p>Even better, because we know that the edge of the circle in the next column over is probably nearby, we can seed our binary search with that knowledge so that we will usually only need one or two checks to identify where the edge is on subsequent columns.</p>
${validate_component(BinarySearch, "BinarySearch").$$render($$result, { axisLength }, {}, {})}
<p>The other advantage of this method is that we can increase the “resolution” of the diagram after we have solved it, using the work we’ve already done as a starting point. We do this by doubling the number of columns and rows, interleaving the new columns between the existing ones. Practically, this looks like adding a zero to the binary representation of every cell index. </p>
<p>On even columns (0 based), which were already in the diagram before, the new answer can only be in the cell immediately above or below the existing answer, since those are the new cells near the edge. On odd columns we can use adjacent columns to jump start our binary search, just like we did when initially filling in the diagram.</p>
<p>The arithmetic we’re talking about here is fairly simple. For the most part we are adding or subtracting, with a single square that we need to compute at each step of the binary search. Once the process is going, most of the squares will be close to ones we’ve already computed, so we can use simplifications like this <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>=</mo><msup><mi>n</mi><mn>2</mn></msup><mo>+</mo><mn>2</mn><mi>n</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">(n+1)^2 = n^2 + 2n + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span> and <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>−</mo><mn>1</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>=</mo><msup><mi>n</mi><mn>2</mn></msup><mo>−</mo><mn>2</mn><mi>n</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">(n - 1)^2 = n^2 - 2n + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8974em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span>. If we’re willing to do the math in binary, multiplying by 2 (which is common in both these simplifications and in binary search itself) becomes a bit shift operation (adding or removing a digit to the little end of a number).</p>
<p>So we’ve satisfied requirements 1 and 2, but we still haven’t figured out what resolution of diagram we would need to break the record. I wrote a calculator based on the above method <a href="https://github.com/schicks/piagram" rel="nofollow">here</a> that implements the upresolution approach and reports the number of digits it got correct at each resolution.</p>`;
    }
  })}`;
});
export {
  Pi_by_hand as default,
  metadata
};
