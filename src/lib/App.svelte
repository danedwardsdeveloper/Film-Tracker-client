<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	import filmsData from './films.js';

	import FilmList from './components/FilmList.svelte';
	import Skeleton from './components/skeleton.svelte';

	import type { Film } from '../types';

	let films: Film[] = [];
	let filmsSeen: number = 0;
	let loading: boolean = true;
	let error: string | null = 'Error message!';

	const calculateFilmsSeen = () => {
		filmsSeen = films.filter((film) => film.seen).length;
	};

	const fetchFilms = async () => {
		try {
			if (import.meta.env.VITE_DEV === 'false') {
				console.log(`Client in production mode. API enabled`);
				const response = await axios.get(
					`https://metacritic-top-100-api.netlify.app/.netlify/functions/server/films`
				);
				films = response.data;
				calculateFilmsSeen();
			} else {
				console.log(`Client in development mode. API bypassed`);
				await new Promise((resolve) => setTimeout(resolve, 2000));
				throw new Error('Simulated error for testing');
				// films = filmsData;
				calculateFilmsSeen();
			}
		} catch (error) {
			console.error(
				'Error fetching films:',
				error?.message || 'Failed to load films.'
			);
		} finally {
			loading = false;
		}
	};

	onMount(() => {
		fetchFilms();
	});

	const toggleSeen = async (id: string) => {
		try {
			const response = await axios.post(
				`https://metacritic-top-100-api.netlify.app/films//films/${id}/toggle`
			);
			films = films.map((film) => (film._id === id ? response.data : film));
			calculateFilmsSeen();
		} catch (error) {
			console.error('Error toggling seen status:', error);
		}
	};

	let skeletonArray = Array.from({ length: 100 });
</script>

<header class="text-center px-3 pt-5">
	<h1 class="font-bold text-4xl">Metacritic's Top 100 Films</h1>
	<p class="py-4">
		A full-stack web app that only Dan can interact with. <span
			class="font-bold">Films seen: {filmsSeen} / 100</span
		>
	</p>
</header>

<main class="flex flex-wrap justify-center mt-10 gap-4">
	{#if error}
		<p class="text-red-600">{error}</p>
	{:else if loading}
		{#each skeletonArray as _}
			<Skeleton />
		{/each}
	{:else}
		<FilmList {films} {toggleSeen} />
	{/if}
</main>
