import { TodoState, TodosProps, TaskPosition } from "../libs/type";
import {
	Box,
	Flex,
	Heading,
	Input,
	FormLabel,
	FormControl,
	Button,
	Text,
	color,
	useColorModeValue,
	useColorMode,
	position,
} from "@chakra-ui/react";
import { AnimatePresence, Reorder } from "framer-motion";
import { AddIcon, CheckIcon, DeleteIcon, SmallCloseIcon, DragHandleIcon } from "@chakra-ui/icons";

import React, { useState, useRef, useEffect, useContext, ReactNode } from "react";
import { shadow, shadowHover, shallowShadow } from "../libs/shadow";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import Motion from "../components/Motion";

type DeleteButtonProps = {
	id: string;
	remove: (id: string) => void;
};

const buttonStyle = {
	display: "flex",
	w: "2.5rem",
	h: "auto",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",

	transition: "0.3s",
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, remove }) => {
	const deleteColor = useColorModeValue("gray.500", "gray.400");

	const bgColor = useColorModeValue("gray.100", "gray.700");
	const bgColorHover = useColorModeValue("gray.200", "gray.600");

	return (
		<Box
			{...buttonStyle}
			bg={bgColor}
			borderRightRadius={5}
			pos="relative"
			onClick={() => {
				remove(id);
			}}
			_hover={{
				bg: bgColorHover,
			}}
		>
			<DeleteIcon w="1rem" h="1rem" color={deleteColor} />
		</Box>
	);
};

type CheckButtonProps = {
	id: string;
	check: (id: string) => void;
	finish: boolean;
};

const CheckButton: React.FC<CheckButtonProps> = ({ id, check, finish }) => {
	const bgColor = useColorModeValue("gray.100", "gray.700");
	const bgColorHover = useColorModeValue("gray.200", "gray.600");

	const borderColorHover = useColorModeValue("gray.400", "gray.400");

	const checkColor = useColorModeValue("teal.500", "teal.200");

	const { colorMode } = useColorMode();

	return (
		<Box
			{...buttonStyle}
			pos="relative"
			borderLeftRadius={5}
			bg={bgColor}
			onClick={() => {
				check(id);
			}}
			_after={{
				content: "''",
				pos: "absolute",
				borderRadius: "50%",
				w: "1.3rem",
				h: "1.3rem",

				transition: "0.3s",
				pointerEvents: "none",

				boxShadow: !finish ? shadow(colorMode) : shadowHover(colorMode),
			}}
			_hover={{
				bg: bgColorHover,
				_after: {
					borderColor: borderColorHover,
					boxShadow: shadowHover(colorMode),
				},
			}}
		>
			{finish && <CheckIcon w="0.8rem" h="0.8rem" color={checkColor} />}
		</Box>
	);
};

const TaskPositionContext = React.createContext<any>(null);

const DragButton: React.FC<{ id: string }> = ({ id }) => {
	const taskDrag = useContext(TaskPositionContext);
	const iconColor = useColorModeValue("gray.500", "gray.400");

	return (
		<Box
			{...buttonStyle}
			cursor="grab"
			pos="relative"
			color={iconColor}
			onMouseDown={() => {
				taskDrag(id);
			}}
		>
			<DragHandleIcon />
		</Box>
	);
};

// const SwitchLine: React.FC<{ position?: string; children: ReactNode }> = ({ position, children }) => {
// 	const lineColor = useColorModeValue(
// 		"linear-gradient(to right ,transparent 0%, rgba(49, 151, 149, 0.8), transparent 100%)",
// 		"linear-gradient(to right ,transparent 0%, rgba(49, 151, 149, 0.8), transparent 100%)"
// 	);
// 	const Line = () => {
// 		return <Box as="span" display="block" w="100%" h="0.2rem" bg={lineColor} />;
// 	};

// 	return (
// 		<>
// 			{position === "top" && <Line />}
// 			{children}
// 			{position === "bottom" && <Line />}
// 		</>
// 	);
// };

const Todo: React.FC<TodoState> = ({
	id,
	content,
	finish,
	date,
	remove = () => {},
	check = () => {},
	update = (a: any, b: any) => {},
	closestPosition,
	dragId,
}) => {
	const { colorMode } = useColorMode();

	const fontColor = useColorModeValue("gray.900", "gray.50");
	const finishedFontColor = useColorModeValue("gray.300", "gray.600");

	const colors = {
		finish: finish ? finishedFontColor : fontColor,
	};

	const [inputValue, setInputValue] = useState(content);

	function onChangeInputValue(e: any) {
		setInputValue(e.target.value);
	}

	function leaveFocus() {
		update(id, inputValue);
	}

	const inputRef = useRef<HTMLTextAreaElement>(null);
	function onEnterPress(e: any) {
		if (e.key !== "Enter") return;
		if (inputRef.current) inputRef.current.blur();
	}

	function resizeTextarea() {
		const el = inputRef.current;
		if (!el) return;

		el.style.height = "1rem";

		const height = inputRef.current.scrollHeight + "px";
		el.style.height = height;
	}

	useEffect(() => {
		resizeTextarea();

		window.addEventListener("resize", resizeTextarea);

		return () => {
			window.removeEventListener("resize", resizeTextarea);
		};
	}, []);

	return (
		<>
			{/* <SwitchLine position={closestPosition?.position}> */}
			<Flex
				w="100%"
				boxShadow={shallowShadow(colorMode)}
				{...(dragId === id && { boxShadow: "0 0 0.5rem -0.1rem rgba(49, 151, 149, 1)" })}
				my="1rem"
				pos="relative"
				{...(!finish && { className: "task" })}
				id={id}
				userSelect="none"
			>
				<CheckButton id={id} check={check} finish={finish} />
				<Flex flex="1" p="0.5rem" pos="relative" alignItems="center">
					{!finish ? (
						<textarea
							color={colors.finish}
							style={{
								width: "100%",
								whiteSpace: "unset",
								wordBreak: "break-word",
								outline: "none",
								backgroundColor: "transparent",
								resize: "none",
								overflowY: "hidden",
							}}
							value={inputValue}
							onChange={(e) => {
								onChangeInputValue(e);
								resizeTextarea();
							}}
							onBlur={leaveFocus}
							onKeyPress={onEnterPress}
							ref={inputRef}
						/>
					) : (
						<Text
							color={colors.finish}
							whiteSpace="unset"
							wordBreak={"break-word"}
							{...(finish && { textDecoration: "line-through" })}
						>
							{inputValue}
						</Text>
					)}
				</Flex>
				{!finish && <DragButton id={id} />}
				<DeleteButton id={id} remove={remove} />
			</Flex>
			{/* </SwitchLine> */}
		</>
	);
};

export const Todos: React.FC<TodosProps> = ({ todos, commands, switchTodo = (a, b) => {} }) => {
	const tasksRef = useRef<HTMLDivElement>(null);

	let taskPosition: TaskPosition[] = [];
	const [dragId, setDragId] = useState<string>("");

	let dragIdCurrent: string = "";
	const [closestPosition, setClosestPosition] = useState<TaskPosition>();
	let closestPositionCurrent: TaskPosition;

	function setDragIdBoth(id: string) {
		setDragId(id);
		dragIdCurrent = id;
	}
	function setClosestPositionBoth(pos: TaskPosition) {
		setClosestPosition(pos);
		closestPositionCurrent = pos;
	}

	function getTopBottomOfTaskPosition() {
		if (!tasksRef.current) return;
		taskPosition = [];

		const parent = tasksRef.current;
		const children = parent.children;

		for (let i = 0; i < children.length; i++) {
			const el = children[i];
			const className = el.classList.contains("task");
			if (!className) continue;

			const rect = el.getBoundingClientRect();

			const y = window.pageYOffset;

			const top = rect.top + y;
			const bottom = top + rect.height;
			const id = el.id;

			taskPosition = [
				...taskPosition,
				{ distance: top, id: id, position: "top" },
				{ distance: bottom, id: id, position: "bottom" },
			];
		}
	}

	function abs(a: number, b: number) {
		return Math.abs(a - b);
	}

	function dragMove(e: any) {
		const positions = taskPosition;

		const y = e.pageY;

		positions.forEach((pos) => {
			const gap = abs(pos.distance, y);
			if (!closestPositionCurrent) return setClosestPositionBoth(pos);

			const previousGap = abs(closestPositionCurrent.distance, y);
			if (gap < previousGap) {
				setClosestPositionBoth(pos);
			}
		});
	}

	function dragSwitchPosition() {
		const id = dragIdCurrent;

		const switchId = closestPositionCurrent?.id;
		const pos = closestPositionCurrent?.position;

		switchTodo(id, switchId, pos);
		getTopBottomOfTaskPosition();
	}

	function dragTask(id: string) {
		setDragIdBoth(id);
		getTopBottomOfTaskPosition();
		window.addEventListener("mousemove", dragMove);
		window.addEventListener("mousemove", dragSwitchPosition);
		window.addEventListener("mouseup", resetDrag);

		const html = document.querySelector("html");
		if (html) html.classList.add("grabbing");
	}

	function resetDrag() {
		setClosestPositionBoth({ distance: 0, id: "", position: "" });
		setDragIdBoth("");
		window.removeEventListener("mousemove", dragMove);
		window.removeEventListener("mousemove", dragSwitchPosition);
		window.removeEventListener("mouseup", resetDrag);

		const html = document.querySelector("html");
		if (html) html.classList.remove("grabbing");
	}
	useEffect(() => {
		return () => {
			resetDrag();
		};
	}, []);

	return (
		<TaskPositionContext.Provider value={dragTask}>
			<Box mt="2rem" ref={tasksRef}>
				{todos.map((todo) => {
					return (
						!todo.finish && (
							<Todo
								{...todo}
								{...commands}
								key={todo.id}
								{...(todo.id === closestPosition?.id && { closestPosition: closestPosition })}
								dragId={dragId}
							/>
						)
					);
				})}
			</Box>
		</TaskPositionContext.Provider>
	);
};

export const DoneTodos: React.FC<TodosProps> = ({ todos, commands }) => {
	return (
		<Box mt="2rem">
			{todos.map((todo) => {
				return todo.finish && <Todo {...todo} {...commands} key={todo.id} />;
			})}
		</Box>
	);
};

type ClearProps = {
	todos: TodoState[];
	clear: () => void;
};

export const ClearDoneTodos: React.FC<ClearProps> = ({ todos, clear }) => {
	const fontColor = useColorModeValue("gray.400", "gray.600");
	const fontColorHover = useColorModeValue("gray.300", "gray.700");

	const iconColor = useColorModeValue("gray.200", "gray.600");

	const underbarColor = useColorModeValue("gray.300", "gray.500");

	return (
		<>
			{todos.some((todo) => todo.finish) && (
				<Flex color={fontColor} alignItems="center" justifyContent="end">
					<Box
						cursor="pointer"
						pos="relative"
						onClick={clear}
						transition="0.5s"
						_after={{
							content: "''",
							pos: "absolute",
							bottom: 0,
							left: "50%",
							transform: "translateX(-50%)",
							w: 0,
							h: "0.06rem",
							bg: underbarColor,
							transition: "0.5s",
						}}
						_hover={{
							_after: {
								w: "100%",
							},
							color: fontColorHover,
						}}
					>
						<SmallCloseIcon w="1.4rem" h="1.4rem" color={iconColor} />
						clear all
					</Box>
				</Flex>
			)}
		</>
	);
};
