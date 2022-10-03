type ColorProps = "grayButton" | "clickableBg" | "clickableBgHover" | "fontColor" | "finishedFontColor";

export function getColors(useColorModeValue: (a: string, b: string) => any, color: ColorProps) {
	switch (color) {
		case "grayButton":
			return useColorModeValue("gray.500", "gray.400");

		case "clickableBg":
			return useColorModeValue("gray.100", "gray.700");

		case "clickableBgHover":
			return useColorModeValue("gray.200", "gray.600");

		case "fontColor":
			return useColorModeValue("gray.900", "gray.50");

		case "finishedFontColor":
			return useColorModeValue("gray.300", "gray.600");

		default:
			return useColorModeValue("gray.400", "gray.400");
	}
}
