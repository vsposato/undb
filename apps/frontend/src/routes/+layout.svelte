<script>
	import '../app.postcss'
	import NProgress from 'nprogress'
	import { navigating, page } from '$app/stores'
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import { trpc } from '$lib/trpc/client'
	import { env } from '$env/dynamic/public'

	import 'nprogress/nprogress.css'
	import { onMount } from 'svelte'
	import { theme } from '$lib/store/ui'

	NProgress.configure({
		minimum: 0.16,
	})

	$: {
		const r = $page.url.searchParams.get('r')
		// TODO: 判断前后是否一致
		if (!r) {
			if ($navigating && $navigating.from?.route.id !== $navigating.to?.route.id) {
				NProgress.start()
			}
		}
		if (!$navigating) {
			NProgress.done()
		}
	}

	onMount(async () => {
		if (env.PUBLIC_UNDB_ANALYTICS_DOMAIN) {
			const Plausible = await import('plausible-tracker').then((m) => m.default)
			Plausible({
				domain: env.PUBLIC_UNDB_ANALYTICS_DOMAIN,
			})
		}
	})
</script>

<QueryClientProvider client={trpc().queryClient}>
	<slot />
</QueryClientProvider>

<svelte:head>
	<title>undb</title>
</svelte:head>

<svelte:window on:beforeunload={null} />

<svelte:document class={$theme} />
