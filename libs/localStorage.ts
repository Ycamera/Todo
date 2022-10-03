import { TodoState } from "./type";

export function saveTodosOnLocalStrage(todos: TodoState[]) {
	localStorage.setItem("todos", JSON.stringify(todos));
}
