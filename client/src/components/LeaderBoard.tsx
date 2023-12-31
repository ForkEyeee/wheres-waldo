import {
  HStack,
  VStack,
  Text,
  Box,
  Heading,
  Center,
  Spinner,
} from "@chakra-ui/react";
import UserNameScore from "./UserNameScore";
import useDataFetching from "../hooks/useDataFetching";
import { useLocation } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  time: string;
  __v: number;
}

interface DataProps {
  success: boolean;
  users: User[];
}

const LeaderBoard = () => {
  const location = import.meta.env.VITE_ENDPOINT + useLocation().pathname;
  const [data, loading, error] = useDataFetching(location) as [
    DataProps | null,
    boolean,
    string
  ];

  if (loading)
    return (
      <Center p={10}>
        <VStack>
          <Heading textDecoration={"underline"}>Leaderboard</Heading>
          <HStack spacing={5}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Text>Loading...</Text>
          </HStack>
        </VStack>
      </Center>
    );

  if (error) {
    return (
      <Box>
        <Text>Failed to fetch data</Text>
      </Box>
    );
  }

  return (
    <Box bg={"white"} pb={10}>
      <Center p={10}>
        <Heading textDecoration={"underline"}>Leaderboard</Heading>
      </Center>
      <Center>
        <VStack alignItems={"stretch"}>
          {data &&
            data.users.map(user => (
              <HStack
                key={user._id}
                spacing={100}
                justifyContent={"space-between"}
              >
                <UserNameScore>
                  {user.username}
                  {user.time}
                </UserNameScore>
              </HStack>
            ))}
        </VStack>
      </Center>
    </Box>
  );
};

export default LeaderBoard;
