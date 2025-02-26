import {
  Button,
  CloseButton,
  Flex,
  Heading,
  Highlight,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HandSelector from "./components/HandSelector";
import usePokerEvaluator from "./hooks/usePokerEvaluator";
import { Hand, HandResult } from "./types/pokerHands";
import NotationGuide from "./components/NotationGuide";

export default function Page() {
  const [hand1, setHand1] = useState<Hand[]>([]);
  const [hand2, setHand2] = useState<Hand[]>([]);
  const [history, setHistory] = useState<HandResult[]>([]);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const { winner, hand1Rank, hand2Rank } = usePokerEvaluator(hand1, hand2);

  const resetGame = () => {
    setHand1([]);
    setHand2([]);
  };

  useEffect(() => {
    if (hand1.length === 5 && hand2.length === 5) {
      setHistory((prev) => [
        ...prev,
        { hand1, hand2, hand1Rank, hand2Rank, winner },
      ]);
    }
  }, [winner, hand1Rank, hand2Rank, hand1, hand2]);

  return (
    <VStack spaceX={8} spaceY={8} padding={20}>
      <Stack>
        <Heading size="5xl" textAlign={"center"} letterSpacing="tight">
          <Highlight query="Evaluator" styles={{ color: "red.600" }}>
            Poker Hand Evaluator
          </Highlight>
        </Heading>

        <Text fontSize="md" color="fg.muted">
          Deal cards for Player 1 and Player 2, and let us determine the winning
          hand!
        </Text>
      </Stack>
      <Flex gap={8} direction={"row"} justifyContent={"space-around"}>
        <HandSelector
          hand={hand1}
          setHand={setHand1}
          label="Player 1"
          winner={winner === "hand1"}
          setShowHelp={() => setShowGuide(!showGuide)}
        />
        <HandSelector
          hand={hand2}
          setHand={setHand2}
          label="Player 2"
          winner={winner === "hand2"}
          setShowHelp={() => setShowGuide(!showGuide)}
        />
      </Flex>

      {showGuide ? (
        <Flex flexDir={"row"}>
          <NotationGuide />

          <CloseButton
            onClick={() => setShowGuide(!showGuide)}
            alignSelf={"start"}
            variant={"ghost"}
            size={"sm"}
          />
        </Flex>
      ) : null}

      {winner && (
        <Flex
          flexDir={"column"}
          gap={4}
          mt={4}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize="lg">
            Player 1: {hand1Rank} | Player 2: {hand2Rank}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            {winner === "tie"
              ? "It's a Tie!"
              : `Winner: ${winner === "hand1" ? "Player 1" : "Player 2"}`}
          </Text>

          <Button colorScheme="red" onClick={resetGame}>
            Reset Game
          </Button>
        </Flex>
      )}

      {history.length > 0 && (
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
      )}
    </VStack>
  );
}
