import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__BUILD_DATE__: JSON.stringify(new Date().toISOString().replace(/[^0-9]/g, ''))
	}
});
