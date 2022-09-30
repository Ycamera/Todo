import { TodoState, TodosProps } from "../libs/type";
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
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";

import React, { useState, useRef, useEffect } from "react";
import { shadow, shadowHover } from "../libs/shadow";

type TypeDeleteButton = {
	id: string;
	remove: (id: string) => void;
};
const DeleteButton: React.FC<TypeDeleteButton> = ({ id, remove }) => {
	const deleteColor = useColorModeValue("gray.500", "gray.400");

	const bgColor = useColorModeValue("gray.100", "gray.700");
	const bgColorHover = useColorModeValue("gray.200", "gray.600");

	return (
		<Box
			display={"flex"}
			w="2.5rem"
			h="auto"
			alignItems="center"
			justifyContent="center"
			cursor="pointer"
			pos="relative"
			borderRightRadius={5}
			bg={bgColor}
			transition="0.3s"
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

	// const borderColor = useColorModeValue("gray.300", "gray.500");
	const borderColorHover = useColorModeValue("gray.400", "gray.400");

	const checkColor = useColorModeValue("teal.500", "teal.200");

	const { colorMode } = useColorMode();

	return (
		<Box
			display={"flex"}
			w="2.5rem"
			h="auto"
			alignItems="center"
			justifyContent="center"
			cursor="pointer"
			pos="relative"
			borderLeftRadius={5}
			bg={bgColor}
			transition="0.3s"
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

const Todo: React.FC<TodoState> = ({
	id,
	content,
	finish,
	date,
	remove = () => {},
	check = () => {},
	update = (a: any, b: any) => {},
}) => {
	const fontColor = useColorModeValue("gray.900", "gray.50");
	const finishedFontColor = useColorModeValue("gray.300", "gray.600");

	const colors = {
		finish: finish ? finishedFontColor : fontColor,
	};

	const shadowColor = useColorModeValue(
		"0 0.2rem 0.5rem -0.3rem rgba(0,0,0,0.3)",
		"0 0.2rem 0.5rem -0.3rem rgba(0,0,0,0.5)"
	);

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
		<Flex w="100%" boxShadow={shadowColor} my="1rem" pos="relative">
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

			<DeleteButton id={id} remove={remove} />
		</Flex>
	);
};

export const Todos: React.FC<TodosProps> = ({ todos, commands }) => {
	return (
		<Box mt="2rem">
			{todos.map((todo) => {
				return !todo.finish && <Todo {...todo} {...commands} key={todo.id} />;
			})}
		</Box>
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
