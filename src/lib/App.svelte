<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';

	import filmsData from './films.js';

	import FilmList from './components/FilmList.svelte';
	import Skeleton from './components/skeleton.svelte';

	import type { Film } from '../types';

	const useDeployedServer: boolean = false;

	const baseURI: string = useDeployedServer
		? import.meta.env.VITE_NETLIFY_SERVER_BASE_URI
		: import.meta.env.VITE_LOCAL_SERVER_BASE_URI;

	console.log(`Base URI: ${baseURI}`);

	let films: Film[] = [];
	let filmsSeen: number = 0;
	let loading: boolean = true;
	let error: string | null = null;

	const calculateFilmsSeen = () => {
		filmsSeen = films.filter((film) => film.seen).length;
	};

	const fetchFilms = async () => {
		try {
			if (import.meta.env.VITE_DEV === 'false') {
				console.log(`Client in production mode. API enabled`);
				const response = await axios.get(baseURI);
				films = response.data;
				calculateFilmsSeen();
			} else {
				console.log(`Client in development mode. API bypassed`);
				// Simulate loading to demonstrate skeletons
				// await new Promise((resolve) => setTimeout(resolve, 2000));
				films = filmsData;
				calculateFilmsSeen();
			}
			calculateFilmsSeen();
		} catch (error) {
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
