<script context="module" lang="ts">
  export async function load({ session }: { session: { posts: Posts } }) {
    return {
      props: {
        posts: session.posts
      }
    }
  }
</script>

<script lang="ts">
  import type {Post} from '$lib/getPosts'
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
    a:hover {
      text-decoration: none;
    }
    :hover h2 {
      text-decoration: underline;
    }
  }
</style>
