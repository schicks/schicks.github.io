import getPosts from '$lib/getPosts';
import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
  const posts = await getPosts();
  return {
    posts
  };
}; 