<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import FilmList from './components/FilmList.svelte';
	import type { Film } from '../types';

	let films: Film[] = [];
	let filmsSeen: number = 0;

	const fetchFilms = async () => {
		try {
			const response = await axios.get(
				`https://metacritic-top-100-api.netlify.app/films/`
			);
			films = response.data;
			calculateFilmsSeen();
		} catch (error) {
			console.error('Error fetching films:', error);
		}
	};

	const calculateFilmsSeen = () => {
		filmsSeen = films.filter((film) => film.seen).length;
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
</script>

<main class="bg-gradient-to-bl from-blue-100 to-pink-100">
	<h1 class="font-bold text-4xl">Metacritic's Top 100 Films</h1>
	<p class="py-4">
		A full-stack web app that only Dan can interact with. <span
			class="font-bold">Films seen: {filmsSeen} / 100</span
		>
	</p>
	<FilmList {films} {toggleSeen} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
