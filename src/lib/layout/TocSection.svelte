<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { TocItem } from './layout.svelte.js';

	interface Props {
		title?: string;
		items?: TocItem[];
		class?: string;
		children?: Snippet;
	}

	let {
		title = 'On this page',
		items,
		class: className = '',
		children
	}: Props = $props();
</script>

<nav class="toc-section box gap-bs {className}">
	<span class="nav-header">{title}</span>
	<div class="box gap-bs">
		{#if items && items.length > 0}
			{#each items as item (item.id)}
				<a class="nav-link" class:active={item.active} href="#{item.id}">{item.label}</a>
			{/each}
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>
</nav>
