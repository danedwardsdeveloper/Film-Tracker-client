import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: '',
			assets: '',
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
