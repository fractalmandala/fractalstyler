<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'narrow-full' | 'narrow-wide' | 'narrow-half' | 'null';
		class?: string;
		children?: Snippet;
	}

	let { variant = 'narrow-full', class: className = '', children }: Props = $props();
</script>

<section class="content-section {variant} {className}">
	{#if children}
		{@render children()}
	{/if}
</section>
