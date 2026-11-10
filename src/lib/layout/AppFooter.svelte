<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<footer class="app-footer {className}">
	{#if children}
		{@render children()}
	{/if}
</footer>
