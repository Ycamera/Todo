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
import { AddIcon, CheckIcon, DeleteIcon, CheckCircleIcon } from "@chakra-ui/icons";

import React from "react";
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

	const shadowColor = useColorModeValue(
		"0 0.1rem 1rem -0.1rem rgba(0,0,0,0.2)",
		"inset 0 -0.1rem 1rem -0.1rem  rgba(255,255,255,0.2)"
	);
	const shadowColorHover = useColorModeValue(
		"inset 0 0.3rem 0.2rem -0.1rem rgba(0,0,0,0.2)",
		"inset 0 -0.1rem 1rem -0.1rem  rgba(255,255,255,0.2)"
	);

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

				boxShadow: shadow(colorMode),
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

const Todo: React.FC<TodoState> = ({ id, content, finish, date, remove = () => {}, check = () => {} }) => {
	const fontColor = useColorModeValue("gray.900", "gray.50");
	const finishedFontColor = useColorModeValue("gray.300", "gray.600");

	const colors = {
		finish: finish ? finishedFontColor : fontColor,
	};

	const shadowColor = useColorModeValue(
		"0 0.2rem 0.5rem -0.3rem rgba(0,0,0,0.3)",
		"0 0.2rem 0.5rem -0.3rem rgba(0,0,0,0.5)"
	);

	return (
		<Flex w="100%" boxShadow={shadowColor} my="1rem" pos="relative">
			<CheckButton id={id} check={check} finish={finish} />
			<Box flex="1" p="0.5rem" pos="relative">
				<Text
					color={colors.finish}
					whiteSpace="unset"
					wordBreak={"break-word"}
					{...(finish && { textDecoration: "line-through" })}
				>
					{content}
				</Text>
			</Box>

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
