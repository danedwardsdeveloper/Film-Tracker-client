import { writable } from 'svelte/store';

// interface User {
//     username: string;
//     isLoggedIn: boolean;
// }

// export const user = writable<User>({
//     username: '',
//     isLoggedIn: false,
// });

export const isLoggedIn = writable<boolean>(false);
export const username = writable<string | null>(null);