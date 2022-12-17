<script>
  import 'prismjs/themes/prism-okaidia.css'
  import 'katex/dist/katex.min.css'
  /** @type string */
  export let title
</script>

<article class="blog">
  <h2>{title}</h2>
  <slot />
</article>

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
