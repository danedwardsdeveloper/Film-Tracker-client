<script>
	import { onMount } from 'svelte';
	import { saveToUserStore } from '../../lib/stores/userStore';

	onMount(() => {
		saveToUserStore('This value was added from the About page to userStore!');
	});
</script>

<main class="bg-gradient-to-r from-blue-100 to-pink-100 h-screen">
	<div class="text-center pt-10">
		<h1 class="text-3xl">About page</h1>
	</div>
</main>
