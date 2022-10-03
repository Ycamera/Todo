export function setInputValueDeleteMoreThanTwoSpaces(setCallback: (setValue: string) => void, value: string) {
	if (!value.replace(/^\s/g, "").length) {
		setCallback("");
	} else {
		setCallback(value.replace(/\ {2,}/g, " ").replace(/　{2,}/g, "　"));
	}
}
