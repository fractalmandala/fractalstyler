<script lang="ts">
	import type { Snippet } from 'svelte';
	import { layoutState } from './layout.svelte.js';

	interface Props {
		header?: Snippet;
		sidebarLeft?: Snippet;
		sidebarRight?: Snippet;
		footer?: Snippet;
		clamped?: boolean;
		open?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		header,
		sidebarLeft,
		sidebarRight,
		footer,
		clamped = false,
		open = false,
		class: className = '',
		children
	}: Props = $props();

	const isShellOpen = $derived(open || layoutState.isOpen);
	const leftContent = $derived(sidebarLeft ?? layoutState.sidebarLeft);
	const rightContent = $derived(sidebarRight ?? layoutState.sidebarRight);
	const headerContent = $derived(header ?? layoutState.header);
	const footerContent = $derived(footer ?? layoutState.footer);
</script>

<div class="app-shell {className}" class:open={isShellOpen}>
	{#if headerContent}
		<header class="app-header" class:clamped>
			{@render headerContent()}
		</header>
	{/if}

	<main class="app-main" class:clamped>
		{#if leftContent}
			<aside class="sidebar-left">
				{@render leftContent()}
			</aside>
		{/if}

		<section class="main-section">
			{#if children}
				{@render children()}
			{/if}
		</section>

		{#if rightContent}
			<aside class="sidebar-right">
				{@render rightContent()}
			</aside>
		{/if}
	</main>

	{#if footerContent}
		<footer class="app-footer">
			{@render footerContent()}
		</footer>
	{/if}
</div>
