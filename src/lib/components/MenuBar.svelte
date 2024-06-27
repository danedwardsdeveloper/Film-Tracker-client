<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import axios from 'axios';

	let open: boolean = true;

	const navigation = [
		{ name: 'Dashboard', href: 'https://www.google.com/', current: true },
		{ name: 'Team', href: 'https://www.google.com/', current: false },
		{ name: 'Projects', href: 'https://www.google.com/', current: false },
		{ name: 'Calendar', href: 'https://www.google.com/', current: false },
	];

	function classNames(...classes: string[]): string {
		return classes.filter(Boolean).join(' ');
	}

	const loggedIn = writable(false);
	const username = writable('');
	const password = writable('');

	const login = async () => {
		try {
			const response = await axios.post('http://localhost:5001/login', {
				username: $username,
				password: $password,
			});

			if (response.data.message === 'Login successful') {
				loggedIn.set(true);
				console.log('Login successful');
			} else {
				console.error('Invalid credentials');
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	const logout = () => {
		loggedIn.set(false);
		username.set('');
		password.set('');
	};
</script>

<nav class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					on:click={() => (open = !open)}
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					{#if open}
						<span>❌</span> <!-- XMarkIcon replacement -->
					{:else}
						<span>☰</span> <!-- Bars3Icon replacement -->
					{/if}
				</button>
			</div>
			<div
				class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
			>
				<div class="flex flex-shrink-0 items-center">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
						alt="Your Company"
					/>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						{#each navigation as item}
							<a
								href={item.href}
								class={classNames(
									item.current
										? 'bg-gray-900 text-white'
										: 'text-gray-300 hover:bg-gray-700 hover:text-white',
									'rounded-md px-3 py-2 text-sm font-medium'
								)}
								aria-current={item.current ? 'page' : undefined}
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					type="button"
					class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					<span class="absolute -inset-1.5"></span>
					<span class="sr-only">View notifications</span>
					<span>🔔</span>
					<!-- BellIcon replacement -->
				</button>

				<!-- Profile dropdown -->
				<div class="relative ml-3">
					<button
						class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						id="user-menu-button"
						aria-expanded="false"
						aria-haspopup="true"
					>
						<span class="absolute -inset-1.5"></span>
						<span class="sr-only">Open user menu</span>
						<img
							class="h-8 w-8 rounded-full"
							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</button>
					<div
						class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<a
							href="/create-account"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>Create account</a
						>
						<a
							href="/log-in"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>Log in</a
						>
						<a
							href="https://www.google.com/"
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>Sign out</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if open}
		<div class="sm:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2">
				{#each navigation as item}
					<a
						href={item.href}
						class={classNames(
							item.current
								? 'bg-gray-900 text-white'
								: 'text-gray-300 hover:bg-gray-700 hover:text-white',
							'block rounded-md px-3 py-2 text-base font-medium'
						)}
						aria-current={item.current ? 'page' : undefined}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
