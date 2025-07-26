export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6')];

export const server_loads = [];

export const dictionary = {
	"/": [3],
	"/posts/[slug]": [4],
	"/resume": [5,[2]],
	"/whos-simon": [6]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};