export const shouldForwardProp: (prop: string) => boolean = (prop) =>
	![
		"colorScheme",
		"variant",
		"size",
		"active",
		"breakpoint",
		"textColored",
		"textColor",
		"textSlashed",
		"fitSize",
		"isGray",
		"isSelected",
		"isClickable",
	].includes(prop);
