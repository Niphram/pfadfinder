/**
 * Double requestAnimationFrame
 */
export function rafraf(callback: FrameRequestCallback) {
	return requestAnimationFrame(() => {
		requestAnimationFrame(callback);
	});
}
