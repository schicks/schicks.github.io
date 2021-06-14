import type {GetSession} from '@sveltejs/kit';

const getFilename = (path: string): string | undefined => path.split('/').pop()

export const getSession: GetSession = async () => {
	const markdownFiles = import.meta.glob('/src/routes/posts/*');
	const posts = (await Promise.all(
		Object
		.entries(markdownFiles)
		.filter(([path]) => !(getFilename(path)?.startsWith('_') ?? true))
		.map(async ([path, page]) => {
			const {metadata, default: body} = await page();
			const blurb = metadata.blurb || body
				.render()
				.html.split('\n')
				.filter((node: string) => node.startsWith('<p'))[0]
			const filename = getFilename(path) as string
			const slug = filename.split('.md', 1)[0];
			return { ...metadata, slug, blurb  };
		})
	)).filter(({status}) => status === 'published');
	posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

	return {
		posts
	};
};