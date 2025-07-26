<script>
  import 'prismjs/themes/prism-okaidia.css'
  import 'katex/dist/katex.min.css'
  import { onMount } from 'svelte'
  
  /** @type string */
  export let title
  
  /** @type {HTMLDivElement | undefined} */
  let commentsContainer
  
  const commentProps = {
    repo: 'schicks/schicks.github.io',
    'issue-term': title,
    label: 'blog-comments',
    theme: 'preferred-color-scheme',
    crossorigin: 'anonymous',
    async: true
  }

  onMount(() => {
    // Clear any existing comments first
    if (commentsContainer) {
      commentsContainer.innerHTML = ''
    }
    
    // Create and configure the script element
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', commentProps.repo)
    script.setAttribute('issue-term', commentProps['issue-term'])
    script.setAttribute('label', commentProps.label)
    script.setAttribute('theme', commentProps.theme)
    script.setAttribute('crossorigin', commentProps.crossorigin)
    script.async = commentProps.async
    
    // Append the script to the comments container
    if (commentsContainer) {
      commentsContainer.appendChild(script)
    }
  })
</script>

<article class="blog">
  <h2>{title}</h2>
  <slot />
</article>

<div bind:this={commentsContainer}></div>

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
