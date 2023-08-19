<script>
  import 'prismjs/themes/prism-okaidia.css'
  import 'katex/dist/katex.min.css'
  /** @type string */
  export let title
  const commentProps = {
    repo: 'schicks/schicks.github.io',
    'issue-term': title,
    label: 'blog-comments',
    theme: 'preferred-color-scheme',
    crossorigin: 'anonymous',
    async: true
  }
</script>

<article class="blog">
  <h2>{title}</h2>
  <slot />
</article>

{#if true}
  <script src="https://utteranc.es/client.js" {...commentProps}></script>
{/if}

<style global>
  article.blog ol li {
    margin-bottom: 20px;
  }
  article.blog blockquote {
    border-left: 4px solid black;
    padding: 1px 20px;
    margin-left: 10px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
</style>
