<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	export let htmlContent: string = '';
	export let showCloseButton: boolean = false;
	let modalStore = getModalStore();
</script>

<main>
	{#if showCloseButton}
		<div class="flex justify-end">
			<button class="m-2 btn bg-gradient-to-br variant-gradient-primary-secondary" on:click={modalStore.close}>Close Modal</button>
		</div>
	{/if}
	<div>
		{@html htmlContent}
	</div>
</main>