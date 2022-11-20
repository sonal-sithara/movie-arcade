<script>
	import { page } from '$app/stores';
	import PageTransition from '../components/Transitions/PageTransition.svelte';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<div>
	<main>
		<!-- <PageTransition url={$page.url}> -->
		<slot />
		<Footer />
		<!-- </PageTransition> -->
	</main>
</div>
