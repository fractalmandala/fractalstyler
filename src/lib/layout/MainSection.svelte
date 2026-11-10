<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		solo?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { solo = false, class: className = '', children }: Props = $props();
</script>

<section class="main-section {className}" class:solo>
	{#if children}
		{@render children()}
	{/if}
</section>
