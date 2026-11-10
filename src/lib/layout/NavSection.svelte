<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		class?: string;
		children?: Snippet;
	}

	let { title, class: className = '', children }: Props = $props();
</script>

<nav class="nav-section box gap-bs {className}">
	<span class="nav-header">{title}</span>
	<div class="box gap-bs">
		{#if children}
			{@render children()}
		{/if}
	</div>
</nav>
