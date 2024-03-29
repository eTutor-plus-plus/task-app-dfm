<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let svg;

	onMount(() => {
		const width = 400;
		const height = 200;

		svg = d3.select('svg')
			.attr('width', "100%")
			.attr('height', "100%");

		svg.append('circle')
			.attr('cx', 50)
			.attr('cy', 100)
			.attr('r', 20)
			.attr('fill', 'white')
			.attr('stroke', 'navy')

		svg.append('circle')
			.attr('cx', 50)
			.attr('cy', 100)
			.attr('r', 10)
			.attr('fill', 'white')
			.attr('stroke', 'navy');

		svg.append('circle')
			.attr('cx', 150)
			.attr('cy', 100)
			.attr('r', 20)
			.attr('fill', 'blue');

		svg.append('line')
			.attr('x1', 50)
			.attr('y1', 100)
			.attr('x2', 150)
			.attr('y2', 100)
			.attr('stroke', 'black');
	});
</script>

<svg></svg>
