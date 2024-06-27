<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	import { getHttpBase } from '../utils/httpBase.js';

	const httpBase = getHttpBase();
	console.log(`HTTP base: ${httpBase}`);

	import filmsData from './films.js';

	import MenuBar from './components/MenuBar.svelte';
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

	const fetchFilms = async () => {
		try {
			const response = await axios.get(`${httpBase}all`);
			films = response.data;
			calculateFilmsSeen();
		} catch (err) {
			console.error('Error fetching films:', err);
			error = 'Failed to load films. Please try again later.';
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

<header class="text-center">
	<MenuBar />
	<h1 class="font-bold text-4xl px-3 pt-5">
		Metacritic <span class="text-gray-400">|</span> Top 100 Films Checklist
	</h1>
	<p class="py-4">
		A full-stack web app that only Dan can interact with. <span
			class="font-bold">Films seen: {filmsSeen} / 100</span
		>
	</p>
</header>

<main class="flex flex-wrap justify-center mt-10 px-3 gap-x-0 gap-y-5 md:gap-5">
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
