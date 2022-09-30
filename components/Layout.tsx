import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
	children: ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<Box w="100%" h="100%" as="main" pb="8rem">
			{children}
		</Box>
	);
};

export default Layout;
