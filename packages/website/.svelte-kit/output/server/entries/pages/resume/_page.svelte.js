import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/index.js";
const JobRole_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".jobrole.svelte-2yph65{margin-left:8px;display:flex;justify-content:space-between}h4.svelte-2yph65{margin:0;font-style:normal}aside.svelte-2yph65{font-weight:bold}ul.svelte-2yph65{margin-top:4px}@media(max-width: 500px){.jobrole.svelte-2yph65{flex-direction:column}}",
  map: null
};
const JobRole = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { period } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.period === void 0 && $$bindings.period && period !== void 0)
    $$bindings.period(period);
  $$result.css.add(css$2);
  return `<div class="jobrole svelte-2yph65"><h4 class="svelte-2yph65">${escape(title)}</h4>
  <aside class="svelte-2yph65">${escape(period)}</aside></div>
<ul class="svelte-2yph65">${slots.default ? slots.default({}) : ``}
</ul>`;
});
const Job_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "h3.svelte-1vgl6i7{margin:0;font-style:normal}summary.svelte-1vgl6i7{display:flex;justify-content:space-between;margin-bottom:4px}aside.svelte-1vgl6i7{font-weight:bold}",
  map: null
};
const Job = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { location } = $$props;
  if ($$props.location === void 0 && $$bindings.location && location !== void 0)
    $$bindings.location(location);
  $$result.css.add(css$1);
  return `<section><summary class="svelte-1vgl6i7"><h3 class="svelte-1vgl6i7">${slots.title ? slots.title({}) : ``}</h3>
    <aside class="svelte-1vgl6i7">${escape(location)}</aside></summary>
  ${slots.default ? slots.default({}) : ``}
</section>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: 'header.svelte-gk4qoc.svelte-gk4qoc{display:flex;justify-content:space-between;padding-bottom:6px;border-bottom:6px solid black}header.svelte-gk4qoc h1.svelte-gk4qoc{margin:0}header.svelte-gk4qoc h1 a.svelte-gk4qoc{text-decoration:none}header.svelte-gk4qoc h1 a.svelte-gk4qoc:hover{text-decoration:underline}header.svelte-gk4qoc summary.svelte-gk4qoc{align-self:center;font-weight:bolder;font-size:20px;margin-top:10px}.info.svelte-gk4qoc dt.svelte-gk4qoc{display:none}.info.svelte-gk4qoc dl.svelte-gk4qoc{margin:10px auto;display:flex;justify-content:center;flex-wrap:wrap;max-width:600px}.info.svelte-gk4qoc dd div.svelte-gk4qoc{display:inline-block}h2.svelte-gk4qoc.svelte-gk4qoc{padding-bottom:3px;border-bottom:3px solid black;margin:0 0 15px}footer.svelte-gk4qoc dt.svelte-gk4qoc{font-weight:bold}footer.svelte-gk4qoc dt.svelte-gk4qoc::after{content:":"}@media(min-width: 750px){footer.svelte-gk4qoc dt.svelte-gk4qoc{font-weight:bold;padding-bottom:4px;margin-bottom:-4px;border-bottom:1px dotted black}footer.svelte-gk4qoc dt.svelte-gk4qoc::after{content:":"}footer.svelte-gk4qoc dd.svelte-gk4qoc{position:relative;margin-left:300px;bottom:22px}}@media(max-width: 500px){.info.svelte-gk4qoc dd.svelte-gk4qoc{display:flex;flex-direction:column}header.svelte-gk4qoc.svelte-gk4qoc{flex-direction:column}header.svelte-gk4qoc summary.svelte-gk4qoc{align-self:flex-start;margin:5px 0 10px}}@media print{a.svelte-gk4qoc.svelte-gk4qoc{text-decoration:none}.noprint.svelte-gk4qoc.svelte-gk4qoc{display:none}footer.svelte-gk4qoc dt.svelte-gk4qoc{border:none !important}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="svelte-gk4qoc"><h1 class="svelte-gk4qoc"><a href="/" class="svelte-gk4qoc">sam schick</a></h1>
  <summary class="svelte-gk4qoc">Staff Software Engineer</summary></header>
<section class="info svelte-gk4qoc"><dl class="svelte-gk4qoc"><dt class="svelte-gk4qoc">pronouns</dt><dd class="svelte-gk4qoc">they/them</dd><dt class="svelte-gk4qoc">email</dt><dd class="svelte-gk4qoc"><a href="mailto:resume@schicksw.mozmail.com" class="svelte-gk4qoc">resume@schicksw.mozmail.com</a></dd><dt class="svelte-gk4qoc">phone</dt><dd class="svelte-gk4qoc">518-729-0655</dd><dt class="noprint svelte-gk4qoc">website</dt><dd class="noprint svelte-gk4qoc"><a href="https://schicks.github.io" class="svelte-gk4qoc">Personal Blog</a></dd><dt class="svelte-gk4qoc">education</dt><dd class="svelte-gk4qoc"><div class="svelte-gk4qoc">B.S. in Mathematics, </div>
      <div class="svelte-gk4qoc">University of Rochester</div></dd></dl></section>
<article class="experience"><h2 class="svelte-gk4qoc">Experience</h2>
  ${validate_component(Job, "Job").$$render($$result, { location: "Remote NY" }, {}, {
    title: () => {
      return `<a href="https://www.cityblock.com/" class="svelte-gk4qoc">Cityblock Health</a>
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Staff Software Engineer",
          period: "Spring 2023 to Present"
        },
        {},
        {
          default: () => {
            return `<li>Working on the care delivery platform to give market operations the tools they need to
        iterate on the care model.
      </li>
      <li>Working with cityblock engineers to create a codebase that is easier to understand and
        improve.
      </li>`;
          }
        }
      )}`;
    }
  })}
  ${validate_component(Job, "Job").$$render($$result, { location: "Remote NY" }, {}, {
    title: () => {
      return `<a href="https://www.pluralsight.com/product/skills" class="svelte-gk4qoc">Pluralsight</a>
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Machine Learning Engineer",
          period: "Spring 2022 to Spring 2023"
        },
        {},
        {
          default: () => {
            return `<li>Built an automated pipeline for query optimization which allowed relevance experiments to be
        described as code and deployed in half the time as the previous manual process.
      </li>
      <li>Facilitated simple, declarative state transfer between airflow tasks by creating a python
        package for persistent dataclasses backed by S3.
      </li>
      <li>Created new granular search API using a vector search model for semantic similarity.</li>
      <li>Improved observability of running models and scheduled tasks by unifying monitoring of all
        deployed code within the search context into Grafana.
      </li>`;
          }
        }
      )}
    ${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Senior Software Engineer, Technical Lead",
          period: "Summer 2021 to Spring 2022"
        },
        {},
        {
          default: () => {
            return `<li>Rewrote the shared navigation for all Pluralsight pages in Svelte, reducing the deployed
        size by a factor of three and the dependency surface by 50%, making the code easier to
        maintain going forward.
      </li>
      <li>Rewrote infrastucture in AWS CDK, giving the full stack engineers on the team direct control
        over their infrastructure.
      </li>`;
          }
        }
      )}`;
    }
  })}
  ${validate_component(Job, "Job").$$render($$result, { location: "Remote NY" }, {}, {
    title: () => {
      return `<a href="https://www.indigoag.com/about" class="svelte-gk4qoc">Indigo Agriculture</a>
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Senior Software Engineer, Technical Lead",
          period: "Winter 2020 to Summer 2021"
        },
        {},
        {
          default: () => {
            return `<li>Helped design and create the <a href="https://source.indigoag.net/" class="svelte-gk4qoc">Source</a> grower communication
        site.
      </li>
      <li>Proposed an architecture for displaying to growers whether they were on track to hit the
        contracted sustainability goals.
      </li>`;
          }
        }
      )}`;
    }
  })}
  ${validate_component(Job, "Job").$$render($$result, { location: "Boston MA" }, {}, {
    title: () => {
      return `<a href="https://www.pluralsight.com/product/skills" class="svelte-gk4qoc">Pluralsight</a>
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Software Engineer, Technical Lead",
          period: "Fall 2018 to Winter 2020"
        },
        {},
        {
          default: () => {
            return `<li>Built the new search experience and relevance engine for the learner experience site.</li>
      <li>Created an experiment platform to iteratively improve search result quality using live
        feedback on query performance. Over it&#39;s lifetime this platform has doubled the search
        clickthrough rate.
      </li>
      <li>Translated between the the needs of search as a product and the highly technical search
        domain.
      </li>`;
          }
        }
      )}`;
    }
  })}
  ${validate_component(Job, "Job").$$render($$result, { location: "Lexington MA" }, {}, {
    title: () => {
      return `<a href="https://www.ll.mit.edu/r-d/technology-office" class="svelte-gk4qoc">MIT Lincoln Laboratory</a>
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Software Engineer",
          period: "Fall 2017 to Fall 2018"
        },
        {},
        {
          default: () => {
            return `<li>Implemented a search engine based around inexact graph matching for data fusion across
        multiple sources.
      </li>
      <li>Redesigned core analytical code for larger scale by moving from python scripts to PySpark.
      </li>
      <li>Developed a UI in React that allowed intuitive visual construction of complex graph queries
        and high level examination of the results.
      </li>`;
          }
        }
      )}`;
    }
  })}
  ${validate_component(Job, "Job").$$render($$result, { location: "Chicago IL" }, {}, {
    title: () => {
      return `Prognos (now <a href="https://www.antuit.ai/solutions/consumer-goods-cpg/demand-forecasting-and-planning" class="svelte-gk4qoc">antuit.ai</a>)
    `;
    },
    default: () => {
      return `${validate_component(JobRole, "JobRole").$$render(
        $$result,
        {
          title: "Developer",
          period: "Fall 2016 to Fall 2017"
        },
        {},
        {
          default: () => {
            return `<li>Developed a visual analytic dashboard for timeseries analysis in demand planning and
        optimization.
      </li>
      <li>Developed an interface for live A/B testing projects, built both for the design of potential
        new promotions and exploration of past ones.
      </li>`;
          }
        }
      )}`;
    }
  })}</article>
<footer class="svelte-gk4qoc"><h2 class="svelte-gk4qoc">Technical Strengths</h2>
  <dl><dt class="svelte-gk4qoc">Computer Languages</dt><dd class="svelte-gk4qoc">Typescript, Python</dd><dt class="svelte-gk4qoc">Databases</dt><dd class="svelte-gk4qoc">Postgres, Elasticsearch, Redis, Kafka</dd><dt class="svelte-gk4qoc">Frameworks</dt><dd class="svelte-gk4qoc">AWS CDK, Airflow, Spark, FastAPI, React, Svelte</dd><dt class="svelte-gk4qoc">Software Development Models</dt><dd class="svelte-gk4qoc">Agile, Extreme Programming, Domain Driven Design</dd></dl>
</footer>`;
});
export {
  Page as default
};
