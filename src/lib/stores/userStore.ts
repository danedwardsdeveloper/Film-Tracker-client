import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(false);
export const username = writable<string | null>(null);