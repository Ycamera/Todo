function defaultShadow(alpha: number, custom?: string) {
	let shadow = `0 0.2rem 0.6rem -0.2rem rgba(0,0,0,${alpha})`;
	if (custom) shadow = custom;

	return `${shadow},inset 0 0.15rem 0.4rem -0.2rem transparent`;
}
function defaultShadowHover(alpha: number, custom?: string) {
	let shadow = `inset 0 0.15rem 0.4em -0.2rem rgba(0,0,0,${alpha})`;
	if (custom) shadow = custom;

	return `0 0.1rem 0.5rem -0.2rem transparent, ${shadow}`;
}

export function shadow(colorMode: string) {
	if (colorMode === "light") return defaultShadow(0.4);
	return defaultShadow(1, "0 0.1rem 0.5rem -0.1rem rgba(0,0,0,1)");
}

export function shadowHover(colorMode: string) {
	if (colorMode === "light") return defaultShadowHover(0.4);
	return defaultShadowHover(1, "inset 0 0.2rem 0.5rem -0.2rem rgba(0,0,0,1)");
}
