import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, useReducer } from "react";
import { v4 as uuid } from "uuid";
import React, { ReactNode } from "react";
import { Box, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";

import Layout from "../components/Layout";
import MyContainer from "../components/MyContainer";

import LoadingEffect from "../components/LoadingEffect";
import Form from "../components/Form";
import Motion from "../components/Motion";

import getDate from "../libs/getDate";
import { saveTodosOnLocalStrage } from "../libs/localStorage";
import { Todos, DoneTodos, ClearDoneTodos } from "../components/Todos";
import { TodoState } from "../libs/type";
import { setInputValueDeleteFirstSpace } from "../libs/changeInputValue";

const FirstRenderMotion: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0, delay: 0.01 }}>
			{children}
		</Motion>
	);
};

function todoReducer(state: TodoState[], action: any) {
	let index;
	let returnState: TodoState[];

	function getIndexOfTodo(state: TodoState[], id: string) {
		return state.findIndex((todo) => todo.id === id);
	}

	switch (action.type) {
		case "add":
			returnState = [{ id: uuid(), content: action.content, finish: false, date: getDate() }, ...state];
			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "remove":
			index = getIndexOfTodo(state, action.id);
			if (index < 0) return state;

			returnState = state.slice();
			returnState.splice(index, 1);
			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "check":
			index = getIndexOfTodo(state, action.id);
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

		case "update":
			index = getIndexOfTodo(state, action.id);
			if (index < 0) return state;

			returnState = state.slice();
			returnState.splice(index, 1, { ...returnState[index], content: action.content });

			saveTodosOnLocalStrage(returnState);
			return returnState;

		case "loadLocalTodos":
			return action.localTodos;

		case "switch":
			const pos = action.pos;

			const indexA = getIndexOfTodo(state, action.id);
			let indexB = getIndexOfTodo(state, action.switchId);

			if (indexA < 0 && indexB < 0) return state;

			if (indexA > indexB) {
				if (pos === "bottom") indexB++;
			} else {
				if (pos === "top") indexB--;
			}

			if (indexA === indexB) return state;

			returnState = state.slice();

			returnState.splice(indexA, 1);
			returnState.splice(indexB, 0, { ...state[indexA] });

			saveTodosOnLocalStrage(returnState);
			return returnState;

		default:
			return state;
	}
}

const Home: NextPage = () => {
	const { colorMode } = useColorMode();
	const [todos, setTodos] = useReducer(todoReducer, []);

	const [inputValue, setInputValue] = useState<string>("");
	const [loadFinished, setLoadFinished] = useState<boolean>(false);

	function add(): void {
		if (!inputValue.length) return;
		setTodos({ type: "add", content: inputValue });
		setInputValue("");
	}
	function onChangeInputValue(e: any): void {
		const value = e.target.value;
		setInputValueDeleteFirstSpace(setInputValue, value);
	}

	function remove(id: string): void {
		setTodos({ type: "remove", id: id });
	}
	function check(id: string): void {
		setTodos({ type: "check", id: id });
	}
	function clearChecked(): void {
		setTodos({ type: "clearChecked" });
	}

	function update(id: string, content: string) {
		setTodos({ type: "update", id: id, content: content });
	}

	function loadTodos(): void {
		const localTodos = localStorage.getItem("todos");
		if (localTodos !== null) {
			setTodos({ type: "loadLocalTodos", localTodos: JSON.parse(localTodos) });
		}
	}

	function switchTodo(id: string, switchId: string, pos: string): void {
		if (id && switchId && pos && id !== switchId) setTodos({ type: "switch", id, switchId, pos });
	}
	useEffect(() => {
		loadTodos();
		const timer = setTimeout(() => {
			setLoadFinished(true);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const finishedFontColor = useColorModeValue("gray.300", "gray.600");

	return (
		<>
			<Head>
				<title>Todo -タスク管理アプリ-</title>
				<meta name="description" content="日々のタスク管理アプリ" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon-precomposed" href="/favicon.ico" />
			</Head>

			<MyContainer as="main">
				<Box as="section">
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

					<LoadingEffect loadFinished={loadFinished} />
					{loadFinished && (
						<FirstRenderMotion>
							<Todos todos={todos} commands={{ remove, check, update }} switchTodo={switchTodo} />
						</FirstRenderMotion>
					)}
				</Box>

				{loadFinished && todos.some((todo: TodoState) => todo.finish) && (
					<FirstRenderMotion>
						<Box as="section">
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
							<ClearDoneTodos todos={todos} clearChecked={clearChecked} />
							<DoneTodos todos={todos} commands={{ remove: remove, check: check }} />
						</Box>
					</FirstRenderMotion>
				)}
			</MyContainer>
		</>
	);
};

export default Home;
