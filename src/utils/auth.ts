import { writable } from 'svelte/store';
import axios from 'axios';
import { goto } from '$app/navigation';
import { getHttpBase } from '../utils/httpBase';

export const isLoggedIn = writable<boolean>(false);

export const user = writable<string | null>(null);

export function checkLoginStatus(): void {
    const token = getCookie('jwt');
    if (token) {
        isLoggedIn.set(true);
    } else {
        isLoggedIn.set(false);
    }
}

export async function signin(email: string, password: string): Promise<void> {
    const httpBase = getHttpBase();
    try {
        const response = await axios.post(
            `${httpBase}auth/signin`,
            { username: email, password: password },
            { withCredentials: true }
        );
        if (response.status === 200) {
            console.log('Sign in successful', response.data);
            setCookie('jwt', response.data.token, 7);
            isLoggedIn.set(true);
            user.set(email)
            goto('/');
        } else {
            console.error('Sign in failed', response.statusText);
            throw new Error('Sign in failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error signing in:', error);
        throw new Error('Sorry, something went wrong.');
    }
}

export async function signInQuickly(): Promise<void> {
    const httpBase = getHttpBase();
    try {
        const response = await axios.post(
            `${httpBase}auth/signin`,
            {
                username: import.meta.env.VITE_TEST_USERNAME,
                password: import.meta.env.VITE_TEST_PASSWORD,
            },
            { withCredentials: true }
        );
        if (response.status === 200) {
            console.log('Sign in successful', response.data);
            setCookie('jwt', response.data.token, 7, 'Lax');
            isLoggedIn.set(true);
            goto('/');
        } else {
            console.error('Quick sign in failed', response.statusText);
            throw new Error('Quick sign in failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error signing in quickly:', error);
        throw new Error('Error signing in quickly. Please try again later.');
    }
}

export function signOut(): void {
    setCookie('jwt', '', -1);
    isLoggedIn.set(false);
}

export function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        console.log(`Cookie name: ${cookieName}, Value: ${decodeURIComponent(cookieValue || '')}`); // Log name and decoded value
        if (cookieName === name) {
            return decodeURIComponent(cookieValue || ''); // Handle empty values
        }
    }
    return null;
}

function setCookie(name: string, value: string, days: number, sameSite: 'Strict' | 'Lax' = 'Lax') {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; SameSite=${sameSite}; Secure`;
}
