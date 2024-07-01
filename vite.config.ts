import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit(), basicSsl()
	],
	envPrefix: 'VITE_',
	define: {
		'process.env': process.env,
	},
	server: {
		https: {
			key: fs.readFileSync('./ssl/privatekey.pem', 'utf8'),
			cert: fs.readFileSync('./ssl/certificate.pem', 'utf8')
		},
		proxy: {}
	}
});
