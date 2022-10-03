import React from "react";
import { Box, Flex, Heading, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import Motion from "./Motion";

type loadingEffectProps = {
	loadFinished: boolean;
};

const LoadingEffect: React.FC<loadingEffectProps> = ({ loadFinished }) => {
	const iconColor = useColorModeValue("gray.500", "gray.400");

	return (
		<>
			{!loadFinished && (
				<Flex w="100%" mt="5rem" justifyContent="center" pos="absolute" left="0">
					<Motion animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
						<SpinnerIcon w="2rem" h="2rem" color={iconColor} />
					</Motion>
				</Flex>
			)}
		</>
	);
};

export default LoadingEffect;
