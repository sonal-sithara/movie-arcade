<script>
	import { page } from '$app/stores';
	import PageTransition from '../components/PageTransition.svelte';
	import '../app.css';
</script>

<div>
	<main>
		<PageTransition url={$page.url}>
			<slot />
		</PageTransition>
	</main>
</div>
