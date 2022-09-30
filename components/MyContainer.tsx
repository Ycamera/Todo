import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = { children: ReactNode };

const Container = ({ children }: Props) => {
	return (
		<Box w="100%" maxW="50rem" px="1rem" mx="auto">
			{children}
		</Box>
	);
};

export default Container;
