import GameHistory from "@/components/GameHistory";
import HandSelector from "@/components/HandSelector";
import usePokerEvaluator from "@/hooks/usePokerEvaluator";
import { Hand, HandResult } from "@/types/HandTypes";
import {
  Button,
  Flex,
  Heading,
  Highlight,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PokerHandEvaluator() {
  const [hand1, setHand1] = useState<Hand[]>([]);
  const [hand2, setHand2] = useState<Hand[]>([]);
  const [history, setHistory] = useState<HandResult[]>([]);
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
      <Flex
        gap={8}
        direction={"row"}
        justifyContent={"space-around"}
        flexWrap={"wrap"}
      >
        <HandSelector
          hand={hand1}
          setHand={setHand1}
          label="Player 1"
          winner={winner === "hand1"}
        />
        <HandSelector
          hand={hand2}
          setHand={setHand2}
          label="Player 2"
          winner={winner === "hand2"}
        />
      </Flex>

      {winner && (
        <Flex
          flexDir={"column"}
          gap={4}
          mt={4}
          alignItems={"center"}
          justifyContent={"center"}
          data-testid="winner-message"
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

      {history.length > 0 && <GameHistory history={history} />}
    </VStack>
  );
}
