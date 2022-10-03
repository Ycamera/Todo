import { Box, Input, FormControl, Button, useColorMode } from "@chakra-ui/react";
import { shallowShadow } from "../libs/shadow";
import { AddIcon } from "@chakra-ui/icons";

type FormProps = {
	onChangeInputValue: (e: any) => void;
	inputValue: string;
	add: () => void;
};
const Form: React.FC<FormProps> = ({ onChangeInputValue, inputValue, add }) => {
	const { colorMode } = useColorMode();

	function onKeyPressEnter(e: any) {
		if (e.key !== "Enter") return;

		add();
	}

	return (
		<Box mt="2rem" boxShadow={shallowShadow(colorMode)} borderRadius="0.5rem">
			<FormControl display="flex">
				<Input
					type="text"
					borderRightRadius={0}
					onChange={onChangeInputValue}
					value={inputValue}
					onKeyPress={onKeyPressEnter}
					placeholder="新しいタスクを追加"
				/>
				<Button colorScheme="teal" borderLeftRadius={0} onClick={add}>
					<AddIcon />
				</Button>
			</FormControl>
		</Box>
	);
};

export default Form;
