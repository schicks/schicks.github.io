import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import headings from 'remark-autolink-headings'
import katex from 'rehype-katex'
import math from 'remark-math'
import footnotes from 'remark-footnotes'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.mdx', '.svx'],
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.mdx'],
      layout: './src/lib/blog.svelte',
      remarkPlugins: [headings, math, footnotes],
      rehypePlugins: [katex, { output: 'html' }]
    })
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    router: false,
    vite: {
      build: {
        minify: 'esbuild'
      }
    }
  }
}

export default config
