<script lang="ts">
  // PageData type removed since it's not needed

  interface PostData {
    content: any; // Svelte component
    meta: {
      title?: string;
      description?: string;
    };
  }

  export let data: PostData
</script>

<svelte:component this={data.content} />

<svelte:head>
  {#if data.meta.title}
    <title>{data.meta.title}</title>
  {/if}
  {#if data.meta.description}
    <meta name="description" content={data.meta.description} />
  {/if}
</svelte:head>
