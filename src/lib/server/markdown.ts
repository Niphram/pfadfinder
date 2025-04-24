import { micromark } from 'micromark';

export function parseMarkdown(doc: string) {
	const html = micromark(doc);

	// TODO
	// - Parse Frontmatter for more details
	// - Heading Links
	// - Add base to links

	return {
		html
	};
}
