<div class="skeleton"></div>

<style>
	.skeleton {
		width: 300px;
		height: 500px;
		border-radius: 4px;
		animation: pulse 1.5s infinite ease-in-out;
		display: flex;
		flex-direction: column;
		text-align: left;
		justify-content: space-between;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	@keyframes pulse {
		0% {
			background-color: white;
		}
		50% {
			background-color: #f0f0f0;
		}
		100% {
			background-color: white;
		}
	}
</style>
