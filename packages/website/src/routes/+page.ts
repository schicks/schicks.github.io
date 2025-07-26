import getPosts from '$lib/getPosts';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = await getPosts();
  return {
    posts
  };
}; 