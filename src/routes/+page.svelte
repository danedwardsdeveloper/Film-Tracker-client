<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import Cookies from 'js-cookie';

	import { isLoggedIn } from '../lib/stores/userStore';

	import { getHttpBase } from '../utils/httpBase.js';

	const httpBase = getHttpBase();
	console.log(`HTTP base: ${httpBase}`);

	import FilmList from '../lib/components/FilmList.svelte';
	import Skeleton from '../lib/components/skeleton.svelte';

	import type { Film } from '../types';

	let films: Film[] = [];
	let filmsSeen: number = 0;
	let loading: boolean = true;
	let error: string | null = null;

	const calculateFilmsSeen = () => {
		filmsSeen = films.filter((film) => film.seen).length;
	};

	const getFilms = async () => {
		const token = Cookies.get('jwt');
		loading = true;
		error = '';

		if ($isLoggedIn) {
			try {
				const response = await axios.get(`${httpBase}user`, {
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				});
				films = response.data.films;
				calculateFilmsSeen();
			} catch (err) {
				console.error('Error fetching films:', err);
				error = 'Failed to load films. Please try again later.';
			} finally {
				loading = false;
			}
		} else {
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
		}
	};

	onMount(() => {
		getFilms();
	});

	const toggleSeen = async (id: string) => {
		try {
			if (!isLoggedIn) {
				console.warn('Error: not logged in.');
				return;
			}

			const token = Cookies.get('jwt');

			if (!token) {
				console.warn('Error. No token provided.');
				return;
			}

			const targetFilmIndex = films.findIndex((film) => film._id === id);
			if (targetFilmIndex === -1) {
				return;
			}

			const updatedFilm = {
				...films[targetFilmIndex],
				seen: !films[targetFilmIndex].seen,
			};

			films[targetFilmIndex] = updatedFilm;

			const response = await axios.post(
				`${httpBase}user/toggle-film`,
				{ filmId: id },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);

			console.log('Toggle seen response:', response.data); // Log for debugging
			calculateFilmsSeen();
			return response.data;
		} catch (error) {
			console.error('Error toggling seen status:', error);
		}
	};

	let skeletonArray = Array.from({ length: 100 });
</script>

<main
	class="flex flex-wrap justify-center pt-10 px-3 gap-x-0 gap-y-5 md:gap-5 bg-gradient-to-r from-blue-100 to-pink-100"
>
	<header class="text-center w-full">
		<h1 class="font-bold text-4xl px-3 pb-5">
			Metacritic <span class="text-gray-400">|</span> Top 100 Films Checklist
		</h1>
		<p class="py-4">
			Films seen: {filmsSeen} / 100
		</p>
	</header>
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
