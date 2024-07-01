<script>
	import { onMount } from 'svelte';
	import { saveToUserStore } from '../../lib/stores/userStore';

	onMount(() => {
		saveToUserStore('This value was added from the About page to userStore!');
	});
</script>

<div class="text-center mt-10">
	<h1 class="text-3xl">About page</h1>
</div>
