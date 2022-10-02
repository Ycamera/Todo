import { Box, Button, useColorMode, Flex, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import React, { ReactNode, useEffect } from "react";
import Motion from "./Motion";
import { Slot } from "@radix-ui/react-slot";
import { shadow, shadowHover } from "../libs/shadow";

import { formatWithOptions } from "util";

const Circle: React.FC = () => {
	const { colorMode } = useColorMode();

	const shadowColor = useColorModeValue(
		"0 0.1rem 0.5rem -0.1rem rgba(0,0,0,0.3)",
		"inset 0 -0.1rem 1rem -0.1rem rgb(255, 255, 255, 0.3);"
	);

	const variants = {
		light: {
			left: 0,
			right: "unset",
		},
		dark: {
			left: "unset",
			right: 0,
		},
	};

	const mode = colorMode === "light" ? "light" : "dark";

	return (
		<Motion variants={variants} initial={false} animate={mode}>
			<Flex
				alignItems="center"
				borderRadius="50%"
				w="1.4rem"
				h="1.4rem"
				pos="absolute"
				boxShadow={shadowColor}
				zIndex={-1}
				boxSizing="content-box"
			></Flex>
		</Motion>
	);
};

const ChangeColorMode = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const sunColor = useColorModeValue("gray.400", "gray.600");
	const moonColor = useColorModeValue("gray.300", "gray.400");

	const iconFilter = `drop-shadow(0 0.1rem 0.1rem rgba(0,0,0,${colorMode === "light" ? 0.2 : 1}))`;

	return (
		<Flex justifyContent="end" w="100%" mt="2rem">
			<Flex
				onClick={() => {
					toggleColorMode();
				}}
				overflow="hidden"
				ml="auto"
				borderRadius="2rem"
				cursor="pointer"
				p="0.3rem"
				alignItems="center"
				pos="relative"
				zIndex={1}
				h="2rem"
				boxShadow={shadow(colorMode)}
				transition="0.3s"
				_hover={{
					boxShadow: shadowHover(colorMode),
				}}
			>
				<Flex pos="relative">
					<Circle />
					<Flex justifyContent="center" alignItems="center" w="1.4rem" h="1.4rem" mr="0.5rem">
						<SunIcon color={sunColor} h="1rem" w="1rem" filter={iconFilter} />
					</Flex>
					<Flex justifyContent="center" alignItems="center" w="1.4rem" h="1.4rem">
						<MoonIcon color={moonColor} h="1rem" w="1rem" filter={iconFilter} />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ChangeColorMode;
