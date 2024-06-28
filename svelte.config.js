import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$utils: 'src/utils',
			$stores: 'src/stores',
		},
		paths: {
			base: '',
			assets: '',
		},
	},
	preprocess: vitePreprocess(),
};

export default config;
