import { writable } from 'svelte/store';

interface User {
    name: string;
    loggedIn: boolean;
}

export const user = writable<User>({
    name: '',
    loggedIn: false,
});
