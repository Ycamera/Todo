export type TodoState = {
	id: string;
	content: string;
	finish: boolean;
	date: string;
	remove?: () => void;
	check?: () => void;
	update?: () => void;
};

export type TodoAction = {
	type: string;
	id?: string;
	content: string;
	localTodos?: TodoState[];
};

export type TodosProps = {
	todos: TodoState[];
	commands: any;
};
