<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
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