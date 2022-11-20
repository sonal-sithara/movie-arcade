<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	export let seasonOption: number;
</script>

{#key seasonOption}
	<div in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}>
		<slot />
	</div>
{/key}
