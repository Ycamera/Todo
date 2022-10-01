export type TodoState = {
	id: string;
	content: string;
	finish: boolean;
	date: string;
	remove?: () => void;
	check?: () => void;
	update?: () => void;
	closestPosition?: TaskPosition;
};

export type TodoAction = {
	type: string;
	id?: string;
	content: string;
	localTodos?: TodoState[];
};

type SwitchTodo = {
	id: string;
	switchId: string;
	pos: string;
};

export type TodosProps = {
	todos: TodoState[];
	commands: any;
	switchTodo?: (id: string, switchId: string, pos: string) => void;
};

export type TaskPosition = {
	distance: number;
	id: string;
	position: string;
};
