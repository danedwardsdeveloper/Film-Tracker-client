import { writable } from 'svelte/store';
import axios from 'axios';
import { goto } from '$app/navigation';
import { getHttpBase } from '../utils/httpBase';

export const isLoggedIn = writable<boolean>(false);

export function checkLoginStatus(): void {
    const user = localStorage.getItem('user');
    if (user) {
        isLoggedIn.set(true);
    } else {
        isLoggedIn.set(false);
    }
}

export async function login(email: string, password: string): Promise<void> {
    const httpBase = getHttpBase();
    try {
        const response = await axios.post(
            `${httpBase}auth/signin`,
            { username: email, password: password },
            { withCredentials: true }
        );
        if (response.status === 200) {
            console.log('Sign in successful', response.data);
            isLoggedIn.set(true);
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

export async function loginQuickly(): Promise<void> {
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

export function logout(): void {
    localStorage.removeItem('user');
    isLoggedIn.set(false);
}
