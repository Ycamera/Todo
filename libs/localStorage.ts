import { TodoState } from "./type";

export function saveTodosOnLocalStrage(todos: TodoState[]) {
	localStorage.setItem("todos", JSON.stringify(todos));
}

// export function saveColorMode(colorMode: string) {
// 	localStorage.setItem("colorMode", JSON.stringify(colorMode));
// }
