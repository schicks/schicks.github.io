import { c as create_ssr_component, v as validate_component, e as escape } from "./index.js";
import { l as loadVegaLiteCharts } from "./utilities.js";
import { B as Blog } from "./blog.js";
const metadata = {
  "title": "Better Pooled Coronavirus Testing",
  "date": "2020-08-26T00:00:00.000Z",
  "status": "published",
  "blurb": "We need to be doing more Coronavirus testing, but it is hard to scale up the number of tests we can run in a day. One way the CDC is recommending getting around this restriction is by pooling tests."
};
const charts = {
  pooledTestFalsePositives: {
    description: "When more people in the population are sick, pooled tests come back positive far too frequently.",
    width: 400,
    height: 200,
    data: {
      sequence: {
        start: 0,
        stop: 16.1,
        step: 0.1,
        as: "percent"
      }
    },
    transform: [
      { calculate: "[5,10,25]", as: "pool_size" },
      { flatten: ["pool_size"] },
      {
        calculate: "100-pow((100-datum.percent)/100, datum.pool_size-1) * 100",
        as: "ppr"
      }
    ],
    mark: "line",
    encoding: {
      x: {
        field: "percent",
        type: "quantitative",
        title: "Percentage of the Population with COVID"
      },
      y: {
        title: "False Positive Rate",
        field: "ppr",
        type: "quantitative"
      },
      color: {
        title: "Pool Size",
        field: "pool_size",
        type: "nominal"
      }
    }
  },
  improvedTestComparison: {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    description: "The false positive rate of the improved testing is significantly lower than with simply pooled tests.",
    data: {
      sequence: {
        start: 0,
        stop: 16.1,
        step: 0.1,
        as: "percent"
      }
    },
    transform: [
      { calculate: "[5,10,25]", as: "pool_size" },
      { flatten: ["pool_size"] },
      { calculate: "3", as: "array_size" },
      {
        calculate: "100-pow((100-datum.percent)/100, datum.pool_size - 1) * 100",
        as: "P(T)"
      },
      {
        calculate: "(pow(datum['P(T)'] / 100, datum.array_size))*100",
        as: "P(A)"
      }
    ],
    hconcat: [
      {
        mark: "line",
        encoding: {
          x: {
            field: "percent",
            type: "quantitative",
            title: "Percentage of the Population with COVID"
          },
          y: { field: "P(T)", type: "quantitative" },
          color: {
            field: "pool_size",
            title: "Pool Size",
            type: "nominal"
          }
        }
      },
      {
        mark: "line",
        encoding: {
          x: {
            field: "percent",
            type: "quantitative",
            title: "Percentage of the Population with COVID"
          },
          y: { field: "P(A)", type: "quantitative" },
          color: {
            field: "pool_size",
            title: "Pool Size",
            type: "nominal"
          }
        }
      }
    ]
  }
};
const load = loadVegaLiteCharts(charts);
const n = null;
const Better_pooled_coronavirus_testing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pooledTestFalsePositives } = $$props;
  let { improvedTestComparison } = $$props;
  if ($$props.pooledTestFalsePositives === void 0 && $$bindings.pooledTestFalsePositives && pooledTestFalsePositives !== void 0)
    $$bindings.pooledTestFalsePositives(pooledTestFalsePositives);
  if ($$props.improvedTestComparison === void 0 && $$bindings.improvedTestComparison && improvedTestComparison !== void 0)
    $$bindings.improvedTestComparison(improvedTestComparison);
  return `${validate_component(Blog, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign({}, $$props, metadata), {}, {
    default: () => {
      return `<style lang="scss">.centered {
  overflow-x: auto;
}
@media (min-width: 800px) {
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.centered figcaption {
  font-style: italic;
}</style>
<p>We need to be doing more Coronavirus testing, but it is hard to scale up the number of tests we can run in a day. One way the CDC is recommending getting around this restriction is by <a href="https://www.cdc.gov/coronavirus/2019-ncov/lab/pooling-procedures.html" rel="nofollow">pooling tests</a>. This amounts to pooling samples from a few people together and running one test. This can drastically increase the number of people we can test with the same number of testing kits. However, in areas where the virus is too common it becomes ineffective because almost every pooled test comes back positive. We can improve on this test by utilizing some simple probabalistic techniques. These will allow us to get more information out of a collection of tests than we get out of each test individually.</p>
<h3>The Status Quo</h3>
<p>Pooled tests work by combining samples from a small pool of people and running a single test kit against the combined sample. This test kit should come back positive if any of the people in the pool are sick.</p>
<ul><li>Pooled tests cover more people with the same number of tests</li>
<li>When a pooled test is negative, everyone in that pool is presumed negative</li>
<li>When a pooled test is positive, each person in the pool needs to be retested.</li></ul>
<p>When too many people in an area are sick, pooled tests come back positive so frequently that it is <a href="https://www.nytimes.com/2020/08/18/health/coronavirus-pool-testing.html" rel="nofollow">no longer worthwhile</a>, given the cost and risk of reaching out to people to get retested.</p>
<figure class="centered"><!-- HTML_TAG_START -->${pooledTestFalsePositives}<!-- HTML_TAG_END -->
  <figcaption>${escape(charts.pooledTestFalsePositives.description)}</figcaption></figure>
<h3>Motivation for Improvement</h3>
<ul><li>A <strong>batch</strong> is the whole collection of tests and people we will examine at once.</li>
<li>A <strong>pool</strong> is the group of people whose sample was applied to a specific test.</li>
<li>A <strong>test array</strong> is the group of tests containing some of a given persons sample. A test array is considered positive if every test in the array is positive.</li></ul>
<p>We can do better than just considering a single pooled test. To start, imagine that one person out of a thousand were sick. We would do this by getting a sample from each person, and labelling them with a number written out in <a href="https://en.wikipedia.org/wiki/Binary_number#Counting_in_binary" rel="nofollow">binary</a>:</p>
<ol><li><span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0000000001</mn></mrow><annotation encoding="application/x-tex">0000000001</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0000000001</span></span></span></span></span></li>
<li><span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0000000010</mn></mrow><annotation encoding="application/x-tex">0000000010</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0000000010</span></span></span></span></span></li>
<li><span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0000000011</mn></mrow><annotation encoding="application/x-tex">0000000011</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0000000011</span></span></span></span></span></li>
<li><span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0000000100</mn></mrow><annotation encoding="application/x-tex">0000000100</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0000000100</span></span></span></span></span></li>
<li><span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0000000101</mn></mrow><annotation encoding="application/x-tex">0000000101</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">0000000101</span></span></span></span></span></li></ol>
<p>And so on. The sample numbered 1000 would be written in binary as <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1111101000</mn></mrow><annotation encoding="application/x-tex">1111101000</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1111101000</span></span></span></span></span>, taking up ten digits. We would line up the ten test kits so that they matched up with digits of the sample labels. Then we would go through all of the samples, and add a given sample to the pool for a test if the digit of the label for that position was 1. The sick person will have their entire test array come back positive.</p>
<p>There is some weirdness here. For instance, a healthy person could have all of the tests containing their sample come back positive. The sample labeled <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span> would only be in one test because it would only have one digit which was <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></span>. That test would come back positive about half the time (whenever the sick person had an odd numbered label). This problem gets softened out if we use enough tests that we can make sure everyones test array is the same size. But as long as each test array is a <em>distinct collection</em> of tests, we can gain information about each individual person even though each test we ran were on pools of people.</p>
<p>This means that what we care about is the number of <em>distinct collections</em>, rather than the number of tests. That is great, because the number of distinct collections which are subsets of some set goes up way faster than the size of the set. Imagine a card game where you draw a hand of 5 cards. Even though there are only <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>52</mn></mrow><annotation encoding="application/x-tex">52</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">52</span></span></span></span></span> cards there are <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mo separator="true">,</mo><mn>598</mn><mo separator="true">,</mo><mn>960</mn></mrow><annotation encoding="application/x-tex">2,598,960</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">598</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">960</span></span></span></span></span> distinct hands that you might draw.</p>
<h3>A Concrete Example</h3>
<p>To show how much we can get out of collections of tests rather than individual tests, lets assume each test array will contain 3 tests. I don’t know for sure how many tests we can get out of a single sample, but probably not a whole lot.</p>
<p>We assume that if someone is sick they will have a positive test array. What we want to know is how likely it is that someone who is not sick will have a positive test array.</p>
<p>The probability that one test is positive (<span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>T</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Rho(T)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mclose">)</span></span></span></span></span>) is the probability that some other person in that test pool was positive. This is <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>T</mi><mo stretchy="false">)</mo><mo>=</mo><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>b</mi><msup><mo stretchy="false">)</mo><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow><annotation encoding="application/x-tex">\\Rho(T) = 1 - (1 - b) ^ ${escape(n - 1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal">b</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span></span></span></span></span>, where <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>b</mi></mrow><annotation encoding="application/x-tex">b</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">b</span></span></span></span></span> is the baseline population rate of COVID and <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span></span> is the number of people in a pool. This is also the probability of a false positive under the original pooling method.</p>
<p>The probability of a false positive under the new method (<span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>A</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">\\Rho(A)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mclose">)</span></span></span></span></span>) is the probability that all of the tests in an array are positive. <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>A</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>T</mi><msup><mo stretchy="false">)</mo><mi>m</mi></msup></mrow><annotation encoding="application/x-tex">\\Rho(A) = \\Rho(T)^m</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">m</span></span></span></span></span></span></span></span></span></span></span></span>, where <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi></mrow><annotation encoding="application/x-tex">m</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">m</span></span></span></span></span> is the number of tests in an array; in our case 3.</p>
<figure class="centered"><!-- HTML_TAG_START -->${improvedTestComparison}<!-- HTML_TAG_END -->
  <figcaption>${escape(charts.improvedTestComparison.description)}</figcaption></figure>
<p>The probability of a false positive in a simple pooled test is <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>T</mi><mo stretchy="false">)</mo><mo>=</mo><mn>1</mn><mo>−</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>x</mi><msup><mo stretchy="false">)</mo><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow><annotation encoding="application/x-tex">\\Rho(T) = 1 - (1-x)^${escape(n - 1)}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal">x</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span></span></span></span></span>. In this modified procedure the probability of a false positive is <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>A</mi><mo stretchy="false">)</mo><mo>=</mo><mi mathvariant="normal">P</mi><mo stretchy="false">(</mo><mi>T</mi><msup><mo stretchy="false">)</mo><mi>m</mi></msup></mrow><annotation encoding="application/x-tex">\\Rho(A) = \\Rho(T)^m</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal">A</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathrm">P</span><span class="mopen">(</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mclose"><span class="mclose">)</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">m</span></span></span></span></span></span></span></span></span></span></span></span>.</p>
<p>This batched strategy looks way better than the simple pooled tests, because we are able to get more information out of each test by considering the information from the whole test array. It also does not have to use any more tests, because the number of distinct collections will always be large compared to the number of tests. The tradeoff is that we need to use several tests at once to be able to talk about collections. This means larger batches, but the same ratio of tests to people.</p>
<h3>In The Real World</h3>
<p>So far we’ve been assuming a miraculous, ideal test which has no false negatives and no false positives. Because a test array is not considered positive unless all of the tests contained in it are positive, false positives on the underlying tests are not a problem. False negatives could be a concern, especially because this method would be most useful where the prevalence of COVID is too high for traditional test pooling. However, there are a few things that protect us from this.</p>
<p>Our test arrays are fairly small. The false negative rate of an array will be <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>β</mi><mi>m</mi></msup></mrow><annotation encoding="application/x-tex">\\beta^m</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05278em;">β</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">m</span></span></span></span></span></span></span></span></span></span></span></span>, where <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>m</mi></mrow><annotation encoding="application/x-tex">m</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">m</span></span></span></span></span> is the size of the array and <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>β</mi></mrow><annotation encoding="application/x-tex">\\beta</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.05278em;">β</span></span></span></span></span> is the false negative rate of the underlying test. The smaller our test array is, the less we increase the false negative rate.</p>
<p>In a case where we were really concerned, we could control the false negative rate further by changing what we considered positive out of a test array. We could say that an array was positive if a majority of the tests in the array were positive. This would prevent a single false negative from making the entire array come back negative, so that it would be easier to catch. This would mean increasing the false positive rate of the batching system as a whole, but we can control for that by running a few more tests per batch while still getting major reductions in the false negative rate.</p>
<p>It’s also likely that false negatives are very correlated; that is, if you get one false negative then all of your tests are likely to be false negatives. In the limiting case where either all of your tests are false negatives or none of them are, this strategy does not actually increase the false negative rate at all.</p>
<h3>Where Do We Go From here</h3>
<p>I am not a biologist, or a doctor. I have never worked in a lab, or run one of these tests, and there may well be constraints that I am overlooking because of that. But from a mathematical perspective, we can do so much better than simply pooling tests together. By considering collections of tests rather than individual tests, we can get all of the benefits of test pooling even when we can’t assume a very low prevalence of COVID.</p>`;
    }
  })}`;
});
export {
  Better_pooled_coronavirus_testing as default,
  load,
  metadata
};
