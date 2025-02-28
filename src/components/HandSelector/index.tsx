import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PokerCard from "../PokerCard";
import { HandSelectorPropTypes } from "@/types/HandTypes";
import { suits } from "@/types/SuitTypes";
import { ranks } from "@/types/RankTypes";
import PokerHandSearch from "../PokerHandSearch";

const HandSelector = ({
  hand,
  setHand,
  label,
  winner,
}: HandSelectorPropTypes) => {
  const [isDealing, setIsDealing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (hand.length === 0) {
      setIsRevealed(false);
    }
  }, [hand]);

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
              <PokerCard
                hand={card}
                isRevealed={card.isRevealed || isRevealed}
              />
            </motion.div>
          );
        })}
      </Flex>

      <Flex
        flexDir={"row"}
        mt={4}
        gap={8}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <PokerHandSearch hand={hand} handleHand={setHand} />
        <Text>or</Text>
        <Button
          data-testid={`deal-hand-${label}`}
          onClick={dealCards}
          disabled={isDealing || hand.length >= 5}
        >
          {isDealing ? "Dealing..." : "Deal Cards"}
        </Button>
      </Flex>
    </Box>
  );
};

export default HandSelector;
