<script>
	import LinePlot from '../components/LinePlot.svelte';

	const exampleData = [
		{ x: 0, y: 0 },
		{ x: 1, y: 1 },
		{ x: 2, y: 4 },
		{ x: 3, y: 9 },
		{ x: 4, y: 16 },
		{ x: 5, y: 25 },
		{ x: 6, y: 36 },
		{ x: 7, y: 49 },
		{ x: 8, y: 64 },
		{ x: 9, y: 81 },
		{ x: 10, y: 100 }
	];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<LinePlot data={exampleData} />