<header>
  <h1><a href="/">Samuel W. Schick</a></h1>
  <summary>Data Engineer</summary>
</header>
<section class="info">
  <dl>
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
  <section>
    <summary>
      <h3><a href="https://www.pluralsight.com/product/skills">Pluralsight</a></h3>
      <aside>Remote NY</aside>
    </summary>
    <div class="jobrole">
      <h4>Machine Learning Engineer</h4>
      <aside>Spring 2022 to Present</aside>
    </div>
    <ul>
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
    </ul>
    <div class="jobrole">
      <h4>Senior Software Engineer, Technical Lead</h4>
      <aside>Summer 2021 to Spring 2022</aside>
    </div>
    <ul>
      <li>
        Rewrote the shared navigation for all Pluralsight pages in Svelte, reducing the deployed
        size by a factor of three and drastically reducing the dependency surface, making the code
        easier to maintain going forward.
      </li>
      <li>
        Rewrote infrastucture in AWS CDK, giving the full stack engineers on the team direct control
        over their infrastructure.
      </li>
    </ul>
  </section>
  <section>
    <summary>
      <h3><a href="https://www.indigoag.com/about">Indigo Agriculture</a></h3>
      <aside>Remote NY</aside>
    </summary>
    <div class="jobrole">
      <h4>Senior Software Engineer, Technical Lead</h4>
      <aside>Winter 2020 to Summer 2021</aside>
    </div>
    <ul>
      <li>
        Helped design and create the <a href="https://source.indigoag.net/">Source</a> grower communication
        site.
      </li>
      <li>
        Proposed an architecture for displaying to growers whether they were on track to hit the
        contracted sustainability goals.
      </li>
    </ul>
  </section>
  <section>
    <summary>
      <h3><a href="https://www.pluralsight.com/product/skills">Pluralsight</a></h3>
      <aside>Boston, MA</aside>
    </summary>
    <div class="jobrole">
      <h4>Software Engineer, Technical Lead</h4>
      <aside>Fall 2018 to Winter 2020</aside>
    </div>
    <ul>
      <li>Built the new search experience and relevance engine for the learner experience site.</li>
      <li>
        Created an experiment platform to iteratively improve search result quality using live
        feedback on query performance.
      </li>
      <li>
        Translated between the the needs of search as a product and the highly technical search
        domain.
      </li>
    </ul>
  </section>
  <section>
    <summary>
      <h3><a href="https://www.ll.mit.edu/r-d/technology-office">MIT Lincoln Laboratory</a></h3>
      <aside>Lexington, MA</aside>
    </summary>
    <div class="jobrole">
      <h4>Software Engineer</h4>
      <aside>Fall 2017 to Fall 2018</aside>
    </div>
    <ul>
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
    </ul>
  </section>
  <section>
    <summary>
      <h3>
        Prognos (now <a
          href="https://www.antuit.ai/solutions/consumer-goods-cpg/demand-forecasting-and-planning"
          >antuit.ai</a
        >)
      </h3>
      <aside>Chicago, IL</aside>
    </summary>
    <div class="jobrole">
      <h4>Developer</h4>
      <aside>Fall 2016 to Fall 2017</aside>
    </div>
    <ul>
      <li>
        Developed a visual analytic dashboard for timeseries analysis in demand planning and
        optimization.
      </li>
      <li>
        Developed an interface for live A/B testing projects, built both for the design of potential
        new promotions and exploration of past ones.
      </li>
    </ul>
  </section>
</article>
<footer>
  <h2>Technical Strengths</h2>
  <dl>
    <dt>Computer Languages</dt>
    <dd>Typescript, Python, OCaml, Rust, Julia</dd>
    <dt>Databases</dt>
    <dd>Postgres, Elasticsearch, Redis, Kafka</dd>
    <dt>Frameworks</dt>
    <dd>AWS CDK, Airflow, Spark, FastAPI, React, Svelte</dd>
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

  .experience {
    h3,
    h4 {
      margin: 0;
      font-style: normal;
    }
    .jobrole {
      display: flex;
      justify-content: space-between;
    }
    summary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    aside {
      font-weight: bold;
    }
  }

  footer dl {
    dt {
      font-weight: bold;
      &::after {
        content: ':';
      }
    }
  }

  @media (min-width: 750px) {
    footer dl {
      dt {
        font-weight: bold;
        padding-bottom: 2px;
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
    .jobrole {
      flex-direction: column;
    }
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
