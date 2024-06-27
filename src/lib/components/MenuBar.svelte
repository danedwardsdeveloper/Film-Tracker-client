<script>
	import { writable } from 'svelte/store';
	import axios from 'axios';

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

<div class="menu-bar">
	<nav>
		<a href="/">Home</a>
	</nav>

	{#if $loggedIn}
		<div class="login-box">
			<span>Welcome, {username}</span>
			<button on:click={logout}>Logout</button>
		</div>
	{:else}
		<div class="login-box">
			<input type="text" placeholder="Username" bind:value={$username} />
			<input type="password" placeholder="Password" bind:value={$password} />
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
		color: black;
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
