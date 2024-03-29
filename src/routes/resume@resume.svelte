<script lang="ts">
  import JobRole from '$lib/JobRole.svelte'
  import Job from '$lib/Job.svelte'
</script>

<header>
  <h1><a href="/">sam schick</a></h1>
  <summary>Staff Software Engineer</summary>
</header>
<section class="info">
  <dl>
    <dt>pronouns</dt>
    <dd>they/them</dd>
    <dt>email</dt>
    <dd><a href="mailto:resume@schicksw.mozmail.com">resume@schicksw.mozmail.com</a></dd>
    <dt>phone</dt>
    <dd>518-729-0655</dd>
    <dt class="noprint">website</dt>
    <dd class="noprint"><a href="https://schicks.github.io">Personal Blog</a></dd>
    <dt>education</dt>
    <dd>
      <div>B.S. in Mathematics,&nbsp</div>
      <div>University of Rochester</div>
    </dd>
  </dl>
</section>
<article class="experience">
  <h2>Experience</h2>
  <Job location="Remote NY">
    <svelte:fragment slot="title">
      <a href="https://www.cityblock.com/">Cityblock Health</a>
    </svelte:fragment>
    <JobRole title="Staff Software Engineer" period="Spring 2023 to Present">
      <li>
        Working on the care delivery platform to give market operations the tools they need to
        iterate on the care model.
      </li>
      <li>
        Working with cityblock engineers to create a codebase that is easier to understand and
        improve.
      </li>
    </JobRole>
  </Job>
  <Job location="Remote NY">
    <svelte:fragment slot="title">
      <a href="https://www.pluralsight.com/product/skills">Pluralsight</a>
    </svelte:fragment>
    <JobRole title="Machine Learning Engineer" period="Spring 2022 to Spring 2023">
      <li>
        Built an automated pipeline for query optimization which allowed relevance experiments to be
        described as code and deployed in half the time as the previous manual process.
      </li>
      <li>
        Facilitated simple, declarative state transfer between airflow tasks by creating a python
        package for persistent dataclasses backed by S3.
      </li>
      <li>Created new granular search API using a vector search model for semantic similarity.</li>
      <li>
        Improved observability of running models and scheduled tasks by unifying monitoring of all
        deployed code within the search context into Grafana.
      </li>
    </JobRole>
    <JobRole title="Senior Software Engineer, Technical Lead" period="Summer 2021 to Spring 2022">
      <li>
        Rewrote the shared navigation for all Pluralsight pages in Svelte, reducing the deployed
        size by a factor of three and the dependency surface by 50%, making the code easier to
        maintain going forward.
      </li>
      <li>
        Rewrote infrastucture in AWS CDK, giving the full stack engineers on the team direct control
        over their infrastructure.
      </li>
    </JobRole>
  </Job>
  <Job location="Remote NY">
    <svelte:fragment slot="title">
      <a href="https://www.indigoag.com/about">Indigo Agriculture</a>
    </svelte:fragment>
    <JobRole title="Senior Software Engineer, Technical Lead" period="Winter 2020 to Summer 2021">
      <li>
        Helped design and create the <a href="https://source.indigoag.net/">Source</a> grower communication
        site.
      </li>
      <li>
        Proposed an architecture for displaying to growers whether they were on track to hit the
        contracted sustainability goals.
      </li>
    </JobRole>
  </Job>
  <Job location="Boston MA">
    <svelte:fragment slot="title">
      <a href="https://www.pluralsight.com/product/skills">Pluralsight</a>
    </svelte:fragment>
    <JobRole title="Software Engineer, Technical Lead" period="Fall 2018 to Winter 2020">
      <li>Built the new search experience and relevance engine for the learner experience site.</li>
      <li>
        Created an experiment platform to iteratively improve search result quality using live
        feedback on query performance. Over it's lifetime this platform has doubled the search
        clickthrough rate.
      </li>
      <li>
        Translated between the the needs of search as a product and the highly technical search
        domain.
      </li>
    </JobRole>
  </Job>
  <Job location="Lexington MA">
    <svelte:fragment slot="title">
      <a href="https://www.ll.mit.edu/r-d/technology-office">MIT Lincoln Laboratory</a>
    </svelte:fragment>
    <JobRole title="Software Engineer" period="Fall 2017 to Fall 2018">
      <li>
        Implemented a search engine based around inexact graph matching for data fusion across
        multiple sources.
      </li>
      <li>
        Redesigned core analytical code for larger scale by moving from python scripts to PySpark.
      </li>
      <li>
        Developed a UI in React that allowed intuitive visual construction of complex graph queries
        and high level examination of the results.
      </li>
    </JobRole>
  </Job>
  <Job location="Chicago IL">
    <svelte:fragment slot="title">
      Prognos (now <a
        href="https://www.antuit.ai/solutions/consumer-goods-cpg/demand-forecasting-and-planning"
        >antuit.ai</a
      >)
    </svelte:fragment>
    <JobRole title="Developer" period="Fall 2016 to Fall 2017">
      <li>
        Developed a visual analytic dashboard for timeseries analysis in demand planning and
        optimization.
      </li>
      <li>
        Developed an interface for live A/B testing projects, built both for the design of potential
        new promotions and exploration of past ones.
      </li>
    </JobRole>
  </Job>
</article>
<footer>
  <h2>Technical Strengths</h2>
  <dl>
    <dt>Computer Languages</dt>
    <dd>Typescript, Python</dd>
    <dt>Databases</dt>
    <dd>Postgres, Elasticsearch, Redis, Kafka</dd>
    <dt>Frameworks</dt>
    <dd>AWS CDK, Airflow, Spark, FastAPI, React, Svelte</dd>
    <dt>Software Development Models</dt>
    <dd>Agile, Extreme Programming, Domain Driven Design</dd>
  </dl>
</footer>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;
    border-bottom: 6px solid black;

    h1 {
      margin: 0;
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    summary {
      align-self: center;
      font-weight: bolder;
      font-size: 20px;
      margin-top: 10px;
    }
  }

  .info {
    dt {
      display: none;
    }
    dl {
      margin: 10px auto;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 600px;
    }
    dd div {
      display: inline-block;
    }
  }

  h2 {
    padding-bottom: 3px;
    border-bottom: 3px solid black;
    margin: 0 0 15px;
  }
  footer {
    dt {
      font-weight: bold;
      &::after {
        content: ':';
      }
    }
  }

  @media (min-width: 750px) {
    footer {
      dt {
        font-weight: bold;
        padding-bottom: 4px;
        margin-bottom: -4px;
        border-bottom: 1px dotted black;
        &::after {
          content: ':';
        }
      }
      dd {
        position: relative;
        margin-left: 300px;
        bottom: 22px;
      }
    }
  }

  @media (max-width: 500px) {
    .info dd {
      display: flex;
      flex-direction: column;
    }
    header {
      flex-direction: column;

      summary {
        align-self: flex-start;
        margin: 5px 0 10px;
      }
    }
  }

  @media print {
    a {
      text-decoration: none;
    }
    .noprint {
      display: none;
    }
    footer dt {
      border: none !important;
    }
  }
</style>
