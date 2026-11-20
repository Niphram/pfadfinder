<script lang="ts">
	import { useSettings } from '#lib/state/settings.svelte.ts';

	import { useToast } from './toast-provider.svelte';
	import SimpleToast from './toasts/simple-toast.svelte';

	const settings = useSettings();

	const { showToast } = useToast();

	$effect(() => {
		if (settings.lastAcknowledgedVersion !== __BUILD_DATE__) {
			// Don't show notification on first use
			if (settings.lastAcknowledgedVersion) {
				showToast(
					SimpleToast,
					{
						type: 'info',
						icon: 'info',
						message: `Pfadfinder was updated!`,
					},
					10000,
				);
			}

			settings.lastAcknowledgedVersion = __BUILD_DATE__;
		}
	});
</script>
