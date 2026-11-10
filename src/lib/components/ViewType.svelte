<script lang="ts">
	import { untrack } from 'svelte';
	import { declarations } from '../utils/context.js';
	import type { ViewTypeProps } from '../types.js';

	let props: ViewTypeProps = $props();
	const decl = declarations('ViewType');

	$effect.pre(() => {
		const snapshot = { ...props };
		untrack(() => decl.setType(props.id, snapshot));
		return () => untrack(() => decl.removeType(props.id));
	});
</script>
