import { writable } from 'svelte/store';

export const isLoggedIn = writable<boolean>(false);
export const username = writable<string | null>(null);

export function saveToUserStore(inputValue: string) {
    localStorage.setItem('User store', inputValue);
}

export const userInitial = writable<string | null>(null);

export function getUserInitial(): string | null {
    return localStorage.getItem('userInitial') || null;
}

export function setUserInitial(value: string): void {
    localStorage.setItem('userInitial', value);
    userInitial.set(value);
}