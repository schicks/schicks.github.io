<script lang="ts">
  import getPosts, { type Post } from '$lib/getPosts'
  export let posts: Promise<Post[]> = getPosts()
</script>

<ul>
  {#await posts then posts}
    {#each posts as post}
      <li>
        <a href={`posts/${post.slug}`}>
          <h2>{post.title}</h2>
          {@html post.blurb}
        </a>
      </li>
    {/each}
  {/await}
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
