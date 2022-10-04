import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<Box w="100%" h="100%" as="main" pb="8rem">
			{children}
		</Box>
	);
};

export default Layout;
