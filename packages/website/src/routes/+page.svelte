<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  $: ({ posts } = data);
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
