<script lang="ts">
	import { signin, signInQuickly } from '$utils/auth';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	const handleSignIn = async (event: Event) => {
		event.preventDefault();
		errorMessage = '';
		try {
			await signin(email, password);
		} catch (error) {
			errorMessage = (error as Error).message;
		}
	};

	const handleSignInQuickly = async (event: Event) => {
		event.preventDefault();
		errorMessage = '';
		try {
			await signInQuickly();
		} catch (error) {
			errorMessage = (error as Error).message;
		}
	};
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2
			class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
		>
			Sign in to your account
		</h2>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6" on:submit={handleSignIn}>
			<div>
				<label
					for="email"
					class="block text-sm font-medium leading-6 text-gray-900"
					>Username</label
				>
				<div class="mt-2">
					<input
						id="email"
						name="email"
						type="name"
						autocomplete="email"
						bind:value={email}
						required
						class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<div class="flex items-center justify-between">
					<label
						for="password"
						class="block text-sm font-medium leading-6 text-gray-900"
						>Password</label
					>
				</div>
				<div class="mt-2">
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						bind:value={password}
						required
						class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Sign in</button
				>
			</div>

			{#if errorMessage}
				<div class="text-red-500 text-sm text-center">
					{errorMessage}
				</div>
			{/if}

			<div>
				<button
					on:click={handleSignInQuickly}
					class="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-900 shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
					>Sign in quickly</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			Not a member?
			<a
				href="/create-account"
				class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>Create an account</a
			>
		</p>
	</div>
</div>
