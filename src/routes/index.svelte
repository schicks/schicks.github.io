<script context="module" lang="ts">
    type Posts = {
        title: string, 
        slug: string, 
        blurb: string
    }[]
    export async function load({session}: {session: {posts: Posts}}) {
        return {props: {
            posts: session.posts
        }}
    }
</script>
<script lang="ts">
    export let posts: Posts;

</script>

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
            text-decoration: underline
        }
    }
</style>

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