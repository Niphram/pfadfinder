export type PropertySpan<Props extends Record<string, unknown>> = {
	start: number;
	length: number;
	props: Partial<Props>;
};

export class RangedProperties<T extends Record<string, string | number>> {
	public spans: PropertySpan<T>[];

	public constructor(length: number) {
		this.spans = [{ start: 0, length, props: {} }];
	}

	public setProp<P extends keyof T>(prop: P, value: T[P], start: number, length: number) {
		const startSpanIdx = this.splitAt(start) ?? 0;
		const endSpanIdx = this.splitAt(start + length) ?? this.spans.length;

		for (let i = startSpanIdx; i < endSpanIdx; i++) {
			this.spans[i].props[prop] = value;
		}
	}

	public setProps(props: Partial<T>, start: number, length: number) {
		const startSpanIdx = this.splitAt(start) ?? 0;
		const endSpanIdx = this.splitAt(start + length) ?? this.spans.length;

		for (let i = startSpanIdx; i < endSpanIdx; i++) {
			this.spans[i].props = props;
		}
	}

	public add(subProps: RangedProperties<T>, offset = 0) {
		for (const subSpan of subProps.spans) {
			this.setProps(subSpan.props, subSpan.start + offset, subSpan.length);
		}
	}

	private splitAt(idx: number) {
		// Get location in spans
		const location = this.indexToSpan(idx);
		if (!location) return undefined;

		const [spanIdx, idxInSpan] = location;

		// Split already there, return the index of the span *after* the split
		if (idxInSpan === 0) return spanIdx;

		const span = this.spans[spanIdx];

		// Create new span
		const newSpan: PropertySpan<T> = {
			start: idx,
			length: span.start + span.length - idx,
			props: Object.assign({}, span.props),
		};

		// Shorten existing span
		span.length = idx - span.start;

		// Insert new span
		this.spans.splice(spanIdx + 1, 0, newSpan);

		return spanIdx + 1;
	}

	private indexToSpan(idx: number): [spanIdx: number, idxInSpan: number] | undefined {
		for (let i = 0; i < this.spans.length; i++) {
			const span = this.spans[i];
			const spanEndIdx = span.start + span.length;

			if (idx >= span.start && idx < spanEndIdx) {
				return [i, idx - span.start];
			}
		}

		return undefined;
	}
}
