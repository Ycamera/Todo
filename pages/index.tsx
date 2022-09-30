import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import React from "react";

import Motion from "/components/Motion";

import {
	Box,
	Flex,
	Heading,
	Input,
	FormLabel,
	FormControl,
	Button,
	Text,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, DeleteIcon, SmallCloseIcon } from "@chakra-ui/icons";

import Layout from "../components/Layout";
import MyContainer from "../components/MyContainer";
import ChangeColorMode from "../components/ChangeColorMode";
import getDate from "../libs/getDate";

import { saveTodosOnLocalStrage } from "../libs/localStorage";
import { Todos, DoneTodos } from "../components/Todos";
import { TodoState, TodoAction } from "../libs/type";

type FormProps = {
	onChangeInputValue: (e: any) => void;
	inputValue: string;
	add: () => void;
};
const Form: React.FC<FormProps> = ({ onChangeInputValue, inputValue, add }) => {
	function pressEnter(e: any) {
		if (e.key !== "Enter") return;

		add();
	}
	return (
		<FormControl display="flex" mt="2rem">
			<Input
				type="text"
				borderRightRadius={0}
				onChange={onChangeInputValue}
				value={inputValue}
				onKeyPress={pressEnter}
			/>
			<Button colorScheme="teal" borderLeftRadius={0} onClick={add}>
				<AddIcon />
			</Button>
		</FormControl>
	);
};

type ClearProps = {
	todos: TodoState[];
	clear: () => void;
};

const Clear: React.FC<ClearProps> = ({ todos, clear }) => {
	const fontColor = useColorModeValue("gray.400", "gray.600");
	const fontColorHover = useColorModeValue("gray.200", "gray.700");

	const iconColor = useColorModeValue("gray.200", "gray.600");

	const underbarColor = useColorModeValue("gray.300", "gray.500");

	return (
		todos.some((todo) => todo.finish) && (
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
		)
	);
};

function todoReducer(state: TodoState[], action: TodoAction) {
	let index;
	let returnState: TodoState[];

	switch (action.type) {
		case "add":
			returnState = [{ id: uuid(), content: action.content, finish: false, date: getDate() }, ...state];
			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "remove":
			index = state.findIndex((todo) => todo.id === action.id);
			if (index < 0) return state;

			returnState = state.slice();
			returnState.splice(index, 1);
			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "check":
			index = state.findIndex((todo) => todo.id === action.id);
			if (index < 0) return state;

			returnState = state.slice();

			const finish = returnState[index].finish;
			returnState.splice(index, 1, { ...returnState[index], finish: !finish });

			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "clearChecked":
			const filteredState = state.filter((todo) => !todo.finish);
			saveTodosOnLocalStrage(filteredState);
			return filteredState;

		case "loadLocalTodos":
			return action.localTodos;

		default:
			return state;
	}
}

const Home: NextPage = () => {
	const { colorMode } = useColorMode();
	const [todos, setTodos] = useReducer<>(todoReducer, []);

	const [inputValue, setInputValue] = useState<string>("");

	function add() {
		if (inputValue.length <= 0) return;
		setTodos({ type: "add", content: inputValue });
		setInputValue("");
	}
	function onChangeInputValue(e: any) {
		setInputValue(e.target.value);
	}

	function remove(id: string) {
		setTodos({ type: "remove", id: id });
	}
	function check(id: string) {
		setTodos({ type: "check", id: id });
	}
	function clearChecked() {
		setTodos({ type: "clearChecked" });
	}

	function loadTodos() {
		const localTodos = localStorage.getItem("todos");
		if (localTodos !== null) {
			setTodos({ type: "loadLocalTodos", localTodos: JSON.parse(localTodos) });
		}
	}
	useEffect(() => {
		loadTodos();
	}, []);

	const finishedFontColor = useColorModeValue("gray.300", "gray.600");

	return (
		<>
			<Head>
				<title>Todo</title>
				<meta name="description" content="日々のタスク管理アプリ" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<MyContainer>
					<ChangeColorMode />
					<Heading
						as="h1"
						fontSize="3rem"
						mx="auto"
						textAlign={"center"}
						mt="2.5rem"
						filter={`drop-shadow(0 0.2rem 0.1rem rgba(0,0,0,${colorMode === "light" ? 0.3 : 1}))`}
					>
						Todo
					</Heading>

					<Form onChangeInputValue={onChangeInputValue} add={add} inputValue={inputValue} />
					<Todos todos={todos} commands={{ remove: remove, check: check }} />

					<Heading
						as="h2"
						fontSize="1.5rem"
						mx="auto"
						textAlign={"center"}
						mt="8rem"
						color={finishedFontColor}
					>
						Done
					</Heading>
					<Clear todos={todos} clear={clearChecked} />

					<DoneTodos todos={todos} commands={{ remove: remove, check: check }} />
				</MyContainer>
			</Layout>
		</>
	);
};

export default Home;
