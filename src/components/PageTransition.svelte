<script lang="ts">
	import { fly, fade } from 'svelte/transition';

	export let url: URL;
</script>

{#key url}
	<!-- <div in:fly={{ x: -5, duration: 500, delay: 500 }} out:fly={{ x: 5, duration: 500 }}> -->
	<div>
		<slot />
	</div>
{/key}
