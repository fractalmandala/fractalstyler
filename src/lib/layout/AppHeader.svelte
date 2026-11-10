<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		clamped?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { clamped = false, class: className = '', children }: Props = $props();
</script>

<header class="app-header {className}" class:clamped>
	{#if children}
		{@render children()}
	{/if}
</header>
