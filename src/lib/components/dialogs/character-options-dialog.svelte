<script lang="ts">
	type Props = {
		charId: string;
		oncopy?: (charId: string) => void;
		onexport?: (charId: string) => void;
		ondelete?: (charId: string) => void;
	};

	const { charId, oncopy, onexport, ondelete }: Props = $props();
</script>

<div class="modal-box">
	<form method="dialog" class="modal-backdrop">
		<div class="flex flex-col gap-4">
			<h3 class="text-primary-content text-lg font-bold">Character options</h3>

			<button class="btn btn-secondary" onclick={() => oncopy?.(charId)}>
				Copy
			</button>
			<button class="btn btn-secondary" onclick={() => onexport?.(charId)}>
				Export
			</button>
			<button
				class="btn btn-warning"
				onclick={() => confirm('Are you sure?') && ondelete?.(charId)}
			>
				Delete
			</button>
		</div>
	</form>
</div>
<form method="dialog" class="modal-backdrop">
	<button>close</button>
</form>
