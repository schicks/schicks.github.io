// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
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