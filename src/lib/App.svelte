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
	let error: string | null = null;

	const calculateFilmsSeen = () => {
		filmsSeen = films.filter((film) => film.seen).length;
	};

	console.log(import.meta.env.VITE_DEV);

	const fetchFilms = async () => {
		try {
			if (import.meta.env.VITE_DEV === 'false') {
				console.log(
					`Client in production mode\n
				API enabled`
				);
				const response = await axios.get(
					`https://metacritic-top-100-api.netlify.app/.netlify/functions/server/films`
				);
				films = response.data;
				calculateFilmsSeen();
			} else {
				console.log(
					`Client in development mode\n
				API bypassed`
				);
				await new Promise((resolve) => setTimeout(resolve, 5000));
				films = filmsData;
				calculateFilmsSeen();
			}
		} catch (error) {
			console.error('Error fetching films:', error);
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

<!-- <main class="bg-gradient-to-bl from-blue-100 to-pink-100"> -->
<h1 class="font-bold text-4xl">Metacritic's Top 100 Films</h1>
<p class="py-4">
	A full-stack web app that only Dan can interact with. <span class="font-bold"
		>Films seen: {filmsSeen} / 100</span
	>
</p>

<div class="flex flex-wrap justify-center mt-10 gap-4">
	{#if loading}
		{#each skeletonArray as _}
			<Skeleton />
		{/each}
	{:else}
		<FilmList {films} {toggleSeen} />
	{/if}
</div>

<!-- </main> -->

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
