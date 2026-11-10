import type { Snippet } from 'svelte';

export type LayoutSnippet = Snippet | (() => any) | null;

export interface TocItem {
	id: string;
	label: string;
	active?: boolean;
}

/**
 * Reactive layout state for dynamic sidebars, table of contents, and app chrome.
 * Allows individual pages or nested routes to set their own sidebar content
 * or table of contents dynamically without prop drilling.
 */
export class LayoutState {
	sidebarLeft = $state<LayoutSnippet>(null);
	sidebarRight = $state<LayoutSnippet>(null);
	header = $state<LayoutSnippet>(null);
	footer = $state<LayoutSnippet>(null);
	tocItems = $state<TocItem[]>([]);
	isOpen = $state<boolean>(false);

	setLeft(content: LayoutSnippet): void {
		this.sidebarLeft = content;
	}

	setRight(content: LayoutSnippet): void {
		this.sidebarRight = content;
	}

	setHeader(content: LayoutSnippet): void {
		this.header = content;
	}

	setFooter(content: LayoutSnippet): void {
		this.footer = content;
	}

	setToc(items: TocItem[]): void {
		this.tocItems = items;
	}

	toggleSidebar(open?: boolean): void {
		this.isOpen = open !== undefined ? open : !this.isOpen;
	}

	reset(): void {
		this.sidebarLeft = null;
		this.sidebarRight = null;
		this.header = null;
		this.footer = null;
		this.tocItems = [];
		this.isOpen = false;
	}
}

export const layoutState = new LayoutState();
