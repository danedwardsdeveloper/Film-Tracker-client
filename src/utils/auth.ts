import axios from 'axios';
import { goto } from '$app/navigation';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

import { setUserInitial, isLoggedIn } from '../lib/stores/userStore';

import { getHttpBase } from '../utils/httpBase';

export const username = writable('');


// This is not secure!
export function checkLoginStatus(): void {
    const token = Cookies.get('jwt');
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
        console.log('Sign in successful', response);

        console.log(`Response code: ${response.status}`)

        if (response.status === 200) {
            Cookies.set('jwt', response.data.token, { expires: 7, sameSite: 'None', secure: false });
            isLoggedIn.set(true);
            const userInitial: string = response.data.username.charAt(0).toUpperCase();
            setUserInitial(userInitial);
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
            Cookies.set('jwt', response.data.token, { expires: 7, sameSite: 'None', secure: false });
            isLoggedIn.set(true);
            // username.set(response.data.username);
            const userInitial: string = response.data.username.charAt(0).toUpperCase();
            setUserInitial(userInitial);
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
    Cookies.remove('jwt');
    isLoggedIn.set(false);
    setUserInitial("");
}
