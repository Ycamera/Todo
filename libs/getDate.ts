function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();

	const date = year + "年" + month + "月" + day + "日";
	return date;
}

export default getDate;
