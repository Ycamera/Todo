import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import Motion from "./Motion";
import { getColors } from "../libs/getColors";

type loadingEffectProps = {
	loadFinished: boolean;
};

const LoadingEffect: React.FC<loadingEffectProps> = ({ loadFinished }) => {
	return (
		<>
			{!loadFinished && (
				<Flex w="100%" mt="5rem" justifyContent="center" pos="absolute" left="0">
					<Motion animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}>
						<SpinnerIcon w="2rem" h="2rem" color={getColors(useColorModeValue, "grayButton")} />
					</Motion>
				</Flex>
			)}
		</>
	);
};

export default LoadingEffect;
