import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type ContainerProps = { children: ReactNode; as?: any };

const Container: React.FC<ContainerProps> = ({ children, as }) => {
	return (
		<Box {...(as && { as: as })} w="100%" maxW="50rem" px="1rem" mx="auto">
			{children}
		</Box>
	);
};

export default Container;
