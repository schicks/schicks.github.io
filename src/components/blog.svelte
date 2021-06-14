<script>
  import 'prismjs/themes/prism-okaidia.css'
  import 'katex/dist/katex.min.css'
  /** @type string */
  export let title
</script>

<article>
  <h2>{title}</h2>
  <slot />
</article>
