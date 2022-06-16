<script context="module" lang="ts">
  import type { Post } from '$lib/getPosts'
  export async function load({ session }: { session: { posts: Post[] } }) {
    return {
      props: {
        posts: session.posts
      }
    }
  }
  export const prerender = false
</script>

<script lang="ts">
  export let posts: Post[]
</script>

<ul>
  {#each posts as post}
    <li>
      <a href={`posts/${post.slug}`}>
        <h2>{post.title}</h2>
        {@html post.blurb}
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul {
    list-style: none;
  }
  li {
    padding-left: 0;
    a {
      text-decoration: none;
    }
    :hover h2 {
      text-decoration: underline;
    }
  }
</style>
