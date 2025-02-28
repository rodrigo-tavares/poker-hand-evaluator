import { Box, Text } from "@chakra-ui/react";
import { JSX } from "react";
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from "react-icons/gi";
import { motion } from "framer-motion";
import { PokerCardPropTypes } from "@/types/PokerCardTypes";
import { Suit } from "@/types/SuitTypes";

const suitIcons: Record<Suit, JSX.Element> = {
  spade: <GiSpades />,
  heart: <GiHearts />,
  diamonds: <GiDiamonds />,
  clubs: <GiClubs />,
};

const PokerCard = ({ hand, isRevealed }: PokerCardPropTypes) => {
  const cardSuit = suitIcons[hand.suit as Suit];
  return (
    <motion.div
      animate={{ rotateY: isRevealed ? 0 : 180 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isRevealed ? (
        <Box
          w="80px"
          h="140px"
          bg="white"
          borderRadius="10px"
          border="1px solid black"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          position="relative"
          role="presentation"
          data-testid="poker-card"
        >
          <Box position="absolute" top="5px" left="5px" textAlign="center">
            <Text fontSize="lg" fontWeight="bold">
              {hand.rank}
            </Text>
            <Text fontSize="md">{cardSuit}</Text>
          </Box>

          <Box fontSize="2xl">{cardSuit}</Box>

          <Box
            position="absolute"
            bottom="5px"
            right="5px"
            textAlign="center"
            transform="rotate(180deg)"
          >
            <Text fontSize="lg" fontWeight="bold">
              {hand.rank}
            </Text>
            <Text fontSize="md">{cardSuit}</Text>
          </Box>
        </Box>
      ) : (
        <Box
          w="80px"
          h="140px"
          bg="black"
          color={"red.400"}
          borderRadius="10px"
          border="1px solid black"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
          position="relative"
          role="presentation"
        >
          ♠️♦️ ♥️♣️
        </Box>
      )}
    </motion.div>
  );
};

export default PokerCard;
