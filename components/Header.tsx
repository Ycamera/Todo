import React from "react";
import ChangeColorModeButton from "../components/ChangeColorModeButton";
import { Box } from "@chakra-ui/react";
import MyContainer from "../components/MyContainer";

const Header: React.FC = () => {
	return (
		<MyContainer as="header">
			<Box as="nav">
				<ChangeColorModeButton />
			</Box>
		</MyContainer>
	);
};

export default Header;
