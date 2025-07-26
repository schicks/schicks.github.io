import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import headings from 'remark-autolink-headings'
import katex from 'rehype-katex'
import math from 'remark-math'
import footnotes from 'remark-footnotes'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.mdx', '.svx'],
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.mdx'],
      layout: {
        _: join(__dirname, 'src/lib/blog.svelte')
      },
      remarkPlugins: [headings, math, footnotes],
      rehypePlugins: [katex, { output: 'html' }]
    })
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      entries: ['*']
    }
  }
}

export default config
