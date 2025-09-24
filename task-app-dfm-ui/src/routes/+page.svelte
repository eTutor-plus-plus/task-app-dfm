<script lang="ts">
	import { ConicGradient, type ConicStop, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { generateVisualization} from '$lib/services/visualization.service';
	import { decodeHtml} from '$lib/helper';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import SVGVisualizer from '$lib/components/SVGVisualizer.svelte';

	const modalStore = getModalStore();

	let taskId:number = 1;
	let dfmContent:string = '';
	let isLoading: boolean = false;
	let svgContent: string = '';
	let errorMessages: string[] = [];

	const conicStops: ConicStop[] = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];

	function showVisualizationModal() {
		const modalComponent: ModalComponent = {
			ref: SVGVisualizer,
			props: { htmlContent: svgContent, showCloseButton: true },
		};
		const visualizationModal: ModalSettings = {
			type: 'component',
			component: modalComponent,
		};
		modalStore.trigger(visualizationModal);
	}

	function reset() {
		new Promise<boolean>((resolve) => {
			const resetModal: ModalSettings = {
				type: 'confirm',
				title: 'Confirm Reset',
				body: 'Are you sure you want to reset the input?',
				response: (r: boolean) => {
					resolve(r);
				}
			};
			modalStore.trigger(resetModal);
		}).then((r: boolean) => {
			if (r) {
				dfmContent = '';
				isLoading = false;
				svgContent = '';
				errorMessages = [];
			}
		});
	}

	async function submitContent() {
		if (!dfmContent) {
			return;
		}
		isLoading = true;
		errorMessages = [];
		let responseBody = await generateVisualization(taskId, dfmContent);
		isLoading = false;

		if (responseBody) {
			let grading = responseBody.grading;
			if (grading.criteria) {
				// Assign the SVG content to the first criteria object that has the name Visualization
				let visualizationCriteria = grading.criteria.find(c => c.name === 'Visualization');
				if (visualizationCriteria) {
					svgContent = decodeHtml(visualizationCriteria.feedback);
				}
				errorMessages = grading.criteria.filter(c => c.name !== 'Visualization' && c.passed !== true).map(c => c.feedback);
			}
		}
	}
</script>

<div class="container h-full mx-auto my-5 flex justify-center items-start">
	<div class="space-y-5 flex flex-col items-center w-2/3">
		<h2 class="h2 text-center">Task App DFM</h2>
		<div class="w-full text-left">
			<p>Task ID</p>
			<input type="number" class="input w-full" placeholder="1" bind:value={taskId} />
		</div>
		<textarea class="textarea" rows="8" placeholder="Enter DFM description to generate visualization" bind:value={dfmContent}></textarea>
		<div class="w-full flex justify-end space-x-2">
			<button type="button" class="btn variant-filled-secondary" on:click={reset}>Reset</button>
			<button type="button" class="btn variant-filled-primary" on:click={submitContent}>Submit</button>
		</div>
		{#if errorMessages.length > 0}
			<div class="w-full flex flex-col items-center space-y-2">
				<p class="text-red-500">Error Messages</p>
				{#each errorMessages as errorMessage}
					<p class="text-red-500">{errorMessage}</p>
				{/each}
			</div>
		{/if}
		{#if isLoading}
			<div class="w-full flex justify-center items-center">
				<ConicGradient stops={conicStops} spin>Generating Visualization</ConicGradient>
			</div>
		{:else if svgContent}
			<div class="flex justify-center items-center border-2 border-black cursor-pointer" on:click={showVisualizationModal}>
				<SVGVisualizer htmlContent={svgContent} />
			</div>
		{/if}
	</div>
</div>