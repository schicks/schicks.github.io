import getPosts from '$lib/getPosts'
import type { Post } from '$lib/getPosts'
import type { RequestHandler } from '@sveltejs/kit'

const url = 'schicks.github.io'

const xmlFeed = (posts: Post[]): string => `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>Simon would have said</title>
    <link>${url}</link>
    ${posts
      .map(
        (post) => `
      <item>
        <title>${post.title}</title>
        <link>${url}/${post.slug}</link>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>
    `
      )
      .join('\n')}
  </channel>
</rss>`

export const get: RequestHandler = async () => ({
  body: xmlFeed(await getPosts()),
  headers: { 'content-type': 'application/rss+xml' }
})
