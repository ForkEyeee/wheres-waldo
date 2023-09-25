import { Box, HStack, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import TimeCounter from "./TimeCounter";

interface Props {
  gameState: {
    start: null | boolean;
    win: null | boolean;
  };
  startTime: string;
  timeElapsed: {
    seconds: number | null;
    minutes: number | null;
  };
  setTimeElapsed: React.Dispatch<
    React.SetStateAction<{
      seconds: number | null;
      minutes: number | null;
    }>
  >;
}

const NavBar = ({
  gameState,
  startTime,
  timeElapsed,
  setTimeElapsed,
}: Props) => {
  return (
    <Box>
      <>
        <Box
          p={2}
          pt={5}
          bg="white"
          fontFamily={"inter"}
          fontSize={16}
          textTransform={"capitalize"}
        >
          <HStack justifyContent="space-between" alignItems={"center"}>
            <Heading>Where's Waldo?!</Heading>
            {gameState.start && !gameState.win && (
              <TimeCounter
                gameState={gameState}
                startTime={startTime}
                timeElapsed={timeElapsed}
                setTimeElapsed={setTimeElapsed}
              />
            )}
            <Text fontSize={20} fontStyle={"italic"}>
              Find Waldo and his friends!
            </Text>
          </HStack>
        </Box>
      </>
      <Flex justifyContent={"center"}>
        <Divider pt={5} width={"50%"} />
      </Flex>
    </Box>
  );
};

export default NavBar;
