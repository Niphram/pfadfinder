import sharp from 'sharp';

export const ICON_PURPOSES = ['any', 'maskable'] as const;
export const ICON_SIZES = [32, 64, 128, 256, 512] as const;

export const ICON_PUPOSES_SIZES = ICON_PURPOSES.flatMap((purpose) =>
	ICON_SIZES.map((size) => ({ purpose, size })),
);

export function isIconPurpose(
	input: string,
): input is (typeof ICON_PURPOSES)[number] {
	return (ICON_PURPOSES as readonly string[]).includes(input);
}

export function isIconSize(
	input: number,
): input is (typeof ICON_SIZES)[number] {
	return (ICON_SIZES as readonly number[]).includes(input);
}

export type IconOptions = {
	masked: boolean;
	size: number;
};

export function generateIcon(
	baseIconPath: string,
	{ size, masked }: IconOptions,
) {
	const image = sharp(baseIconPath).resize({
		width: size,
		height: size,
		position: 'centre',
	});

	if (masked) {
		const mask = Buffer.from(
			`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill-opacity="1"/></svg>`,
		);

		image.composite([
			{
				input: Buffer.from(mask),
				blend: 'dest-in',
			},
		]);
	}

	return image;
}
