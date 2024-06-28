import { writable } from 'svelte/store';

// Define and export the isLoggedIn store
export const isLoggedIn = writable<boolean>(false);

// Example function to check login status
export function checkLoginStatus(): void {
    // Replace this with your actual authentication check logic
    const user = localStorage.getItem('user');
    if (user) {
        isLoggedIn.set(true);
    } else {
        isLoggedIn.set(false);
    }
}

// Example function to log in
export function login(): void {
    // Replace this with your actual login logic
    localStorage.setItem('user', 'exampleUser');
    isLoggedIn.set(true);
}

// Example function to log out
export function logout(): void {
    localStorage.removeItem('user');
    isLoggedIn.set(false);
}
