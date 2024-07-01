<script lang="ts">
	import type { Film } from '../../types.d.ts';

	export let films: Film[] = [];
	export let toggleSeen: (id: string) => void;
	let errorMessage: string | null = null;

	const handleToggle = async (id: string) => {
		try {
			await toggleSeen(id);
		} catch (error) {
			console.error('Error toggling seen status:', error);
		}
	};
</script>

{#each films as film}
	<button
		on:click={() => handleToggle(film._id)}
		class="card w-full md:w-80 transition ease-in-out
			{film.seen ? 'bg-green-100' : 'bg-slate-100'}"
	>
		<div class="w-full flex justify-between align-top">
			<h2 class="font-bold text-xl">
				{film.title}, {film.year}
			</h2>
			<p class="text-3xl">{film.seen ? '✅' : '🔲'}</p>
		</div>
		<h3 class="pb-4 text-lg">
			Rank: {film.rank} <span class="text-gray-400"> |</span>
			Metascore: {film.metascore}
		</h3>
		{#if film.notes}
			<p class="text-base text-justify pb-2">
				📝 Dan's notes:
				<span class="text-gray-700">
					{film.notes}
				</span>
			</p>
		{/if}
		<p class="text-base text-justify">{film.description}</p>
	</button>
{/each}

<style>
	.card {
		display: flex;
		flex-direction: column;
		text-align: left;
		justify-content: space-between;
		height: min-content;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 12px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}
	.card:hover {
		transform: translateY(-10px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	button {
		cursor: pointer;
		border: none;
		padding: 0.5em 1em;
		border-radius: 5px;
	}
</style>
