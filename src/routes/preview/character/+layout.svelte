<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="h-screen w-screen">
	<slot />

	<a href="{base}/preview" class="btn btn-info">Back to start</a>
</div>
