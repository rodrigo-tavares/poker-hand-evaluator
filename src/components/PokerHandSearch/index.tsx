import { Hand } from "@/types/HandTypes";
import { Card } from "@/types/PokerCardTypes";
import { Rank, ranks } from "@/types/RankTypes";
import {
  CloseButton,
  Flex,
  IconButton,
  Input,
  List,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrHelp } from "react-icons/gr";
import NotationGuide from "../NotationGuide";
import { SuitMap } from "@/types/SuitTypes";

const allCards: Card[] = ranks.flatMap((rank) =>
  ["S", "H", "D", "C"].map((suit) => `${rank}${suit}` as Card)
);

const PokerHandSearch = ({
  hand,
  handleHand,
}: {
  hand: Hand[];
  handleHand: (hand: Hand[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const filteredCards = allCards
    .filter((card) => card.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const toggleCard = (card: Card) => {
    const rank = card.slice(0, -1) as Rank;
    const suitKey = card.slice(-1) as keyof typeof SuitMap;
    const suit = SuitMap[suitKey];

    const handCard: Hand = { suit, rank, isRevealed: true };

    if (
      hand.some((c) => c.rank === handCard.rank && c.suit === handCard.suit)
    ) {
      handleHand(
        hand.filter(
          (c) => !(c.rank === handCard.rank && c.suit === handCard.suit)
        )
      );
    } else if (hand.length < 5) {
      handleHand([...hand, handCard]);
    }
    setSearch("");
  };

  return (
    <Flex gap={1}>
      <Flex flexDir={"column"} w="full" position="relative">
        <Input
          placeholder="Search for a card (e.g., AS, 10H)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={hand.length >= 5}
        />
        {hand.length < 5 && (
          <Text mt={2} color="red.500" fontSize="sm">
            You need to select exactly 5 cards.
          </Text>
        )}

        {search && filteredCards.length > 0 && (
          <List.Root
            position="absolute"
            bg="white"
            w="full"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mt={45}
            zIndex="10"
            maxH="180px"
            overflowY="auto"
          >
            {filteredCards.map((card) => (
              <List.Item
                key={card}
                p={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => toggleCard(card)}
              >
                {card}
              </List.Item>
            ))}
          </List.Root>
        )}
      </Flex>

      <IconButton
        onClick={() => setShowGuide(!showGuide)}
        size={"md"}
        aria-label="See notation guide"
        variant={"surface"}
      >
        <GrHelp />
      </IconButton>

      {showGuide ? (
        <Flex
          flexDir={"row"}
          position={"absolute"}
          background={"white"}
          padding={5}
          marginTop={45}
          marginRight={15}
          borderWidth="1px"
          borderRadius="lg"
        >
          <NotationGuide />

          <CloseButton
            onClick={() => setShowGuide(!showGuide)}
            variant={"ghost"}
            size={"sm"}
            position={"absolute"}
            right={1}
            top={1}
          />
        </Flex>
      ) : null}
    </Flex>
  );
};

export default PokerHandSearch;
