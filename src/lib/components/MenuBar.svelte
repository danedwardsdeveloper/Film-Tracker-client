<script>
	import { writable } from 'svelte/store';

	// Store for managing login state
	const loggedIn = writable(false);

	let username = '';
	let password = '';

	const login = () => {
		if (username && password) {
			loggedIn.set(true);
			// For simplicity, just logging the username and password
			console.log(
				`Logged in with username: ${username} and password: ${password}`
			);
		}
	};

	const logout = () => {
		loggedIn.set(false);
		username = '';
		password = '';
	};
</script>

<div class="menu-bar">
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
	</nav>

	{#if $loggedIn}
		<div class="login-box">
			<span>Welcome, {username}</span>
			<button on:click={logout}>Logout</button>
		</div>
	{:else}
		<div class="login-box">
			<input type="text" placeholder="Username" bind:value={username} />
			<input type="password" placeholder="Password" bind:value={password} />
			<button on:click={login}>Login</button>
		</div>
	{/if}
</div>

<style>
	.menu-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #333;
		color: white;
	}

	.menu-bar a {
		color: white;
		text-decoration: none;
		margin: 0 1rem;
	}

	.login-box {
		display: flex;
		align-items: center;
	}

	.login-box input {
		margin: 0 0.5rem;
		padding: 0.5rem;
	}

	.login-box button {
		padding: 0.5rem 1rem;
		background-color: #444;
		color: white;
		border: none;
		cursor: pointer;
	}

	.login-box button:hover {
		background-color: #555;
	}
</style>
