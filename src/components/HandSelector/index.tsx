import { Box, Button, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PokerCard from "../PokerCard";
import { LuBadgeHelp } from "react-icons/lu";
import { PiCheck } from "react-icons/pi";
import { Hand, HandSelectorPropTypes } from "@/types/HandTypes";
import { SuitMap, suits } from "@/types/SuitTypes";
import { ranks } from "@/types/RankTypes";

const HandSelector = ({
  hand,
  setHand,
  label,
  winner,
  setShowHelp,
}: HandSelectorPropTypes) => {
  const [isDealing, setIsDealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [handInput, setHandInput] = useState("");

  useEffect(() => {
    if (hand.length === 0) {
      setIsRevealed(false);
    }
  }, [hand]);

  const handleInputCards = () => {
    const parsedHandInput = handInput
      .trim()
      .split(" ")
      .map((card) => {
        const suitKey = card.slice(-1) as keyof typeof SuitMap;

        return {
          rank: card.slice(0, -1),
          suit: SuitMap[suitKey],
        };
      });

    setHand(parsedHandInput as Hand[]);
    setIsRevealed(true);
    setHandInput("");
  };

  const dealCards = async () => {
    setIsRevealed(false);
    setIsDealing(true);

    if (hand.length < 5) {
      setIsDealing(true);
      setIsRevealed(false);

      setTimeout(() => {
        const newHand = Array.from({ length: 5 }, () => ({
          suit: suits[Math.floor(Math.random() * suits.length)],
          rank: ranks[Math.floor(Math.random() * ranks.length)],
        }));
        setHand(newHand);
        setIsRevealed(true);
      }, 500);

      setIsDealing(false);
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={winner ? "green.600" : "gray.300"}
      w="500px"
      textAlign="center"
      overflow="hidden"
    >
      <Text fontSize="xl" mb={4}>
        {label}
      </Text>
      <Flex justify="center" flexWrap="wrap" gap={2} maxW="100%">
        {Array.from({ length: 5 }).map((_, index) => {
          const card = hand[index] || {};
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <PokerCard hand={card} isRevealed={isRevealed} />
            </motion.div>
          );
        })}
      </Flex>

      <Flex flexDir={"row"} mt={4} gap={8} alignItems={"center"}>
        <Flex gap={1}>
          <Input
            placeholder="Enter hand (e.g., AS 10H 7D 4C 2S)"
            value={handInput}
            onChange={(e) => setHandInput(e.target.value.toUpperCase())}
          />

          {handInput.length === 0 ? (
            <IconButton onClick={setShowHelp} aria-label="See notation guide">
              <LuBadgeHelp />
            </IconButton>
          ) : (
            <IconButton onClick={handleInputCards}>
              <PiCheck />
            </IconButton>
          )}
        </Flex>
        <Text>or</Text>
        <Button onClick={dealCards} disabled={isDealing || hand.length >= 5}>
          {isDealing ? "Dealing..." : "Deal Cards"}
        </Button>
      </Flex>
    </Box>
  );
};

export default HandSelector;
