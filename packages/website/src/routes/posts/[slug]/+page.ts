import { error } from '@sveltejs/kit';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }: { params: { slug: string } }) => {
  try {
    const post = await import(`../${params.slug}.mdx`);

    return {
      content: post.default,
      meta: post.metadata || {}
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}; 