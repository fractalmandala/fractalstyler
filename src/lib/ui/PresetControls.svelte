<script lang="ts">
	import { onMount } from 'svelte';
	import { SHAPES, SIZES, PADS, VARIANTS } from '#lib/types.js';
	import { presetState } from '#lib/presets.svelte.js';

	onMount(() => presetState.init());
</script>

<div class="row ycenter gap-sm" aria-label="Global component presets">
	<label class="row ycenter gap-xs text-body-sm text-muted">
		<span>Size</span>
		<select class="select el-size" data-size="sm" data-variant="outline" value={presetState.size} aria-label="Global size preset" onchange={(event) => presetState.setSize((event.currentTarget as HTMLSelectElement).value as typeof presetState.size)}>
			{#each SIZES as size}<option value={size}>{size}</option>{/each}
		</select>
	</label>
	<label class="row ycenter gap-xs text-body-sm text-muted">
		<span>Shape</span>
		<select class="select el-shape" data-size="sm" data-variant="outline" value={presetState.shape} aria-label="Global shape preset" onchange={(event) => presetState.setShape((event.currentTarget as HTMLSelectElement).value as typeof presetState.shape)}>
			{#each SHAPES as shape}<option value={shape}>{shape}</option>{/each}
		</select>
	</label>
	<label class="row ycenter gap-xs text-body-sm text-muted">
		<span>Card pad</span>
		<select class="select el-pad" data-size="sm" data-variant="outline" value={presetState.pad} aria-label="Global card pad preset" title="Padding preset — applies to .el-pad elements" onchange={(event) => presetState.setPad((event.currentTarget as HTMLSelectElement).value as typeof presetState.pad)}>
			{#each PADS as pad}<option value={pad}>{pad}</option>{/each}
		</select>
	</label>
	<label class="row ycenter gap-xs text-body-sm text-muted">
		<span>Variant</span>
		<select class="select el-variants" data-size="sm" data-variant="outline" value={presetState.variant} aria-label="Global variant preset" title="Variant preset — applies to .el-variants elements" onchange={(event) => presetState.setVariant((event.currentTarget as HTMLSelectElement).value as typeof presetState.variant)}>
			{#each VARIANTS as variant}<option value={variant}>{variant}</option>{/each}
		</select>
	</label>
	<button class="button" data-size="sm" data-variant="outline" type="button" onclick={() => presetState.reset()}>Reset</button>
</div>