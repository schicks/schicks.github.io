import type { GetSession } from '@sveltejs/kit'
import getPosts from '$lib/getPosts'



export const getSession: GetSession = async () => {
  return {
    posts: await getPosts()
  }
}
