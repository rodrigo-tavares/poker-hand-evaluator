import { HandResult } from "@/types/pokerHands";
import { Flex, Heading, Highlight, Text } from "@chakra-ui/react";

type GameHistoryPropTypes = {
  history: HandResult[];
};

function GameHistory({ history }: GameHistoryPropTypes) {
  return (
    <Flex flexDir={"column"} gap={2} mt={6} w="80%">
      <Heading size="md" mb={2}>
        Game History
      </Heading>
      {history.map((game, index) => (
        <Flex
          flexDir={"column"}
          gap={4}
          key={index}
          borderWidth="1px"
          p={4}
          borderRadius="md"
          mb={2}
        >
          <Text>
            Game {index + 1} -{" "}
            <Highlight
              query={["Player 1", "Player 2"]}
              styles={{
                color: game.winner === "hand1" ? "blue.500" : "red.500",
              }}
            >
              {game.winner === "tie"
                ? "It's a Tie!"
                : `Winner: ${
                    game.winner === "hand1" ? "Player 1" : "Player 2"
                  }`}
            </Highlight>
          </Text>
          <Text>
            Player 1: {game.hand1Rank} | Player 2: {game.hand2Rank}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default GameHistory;
