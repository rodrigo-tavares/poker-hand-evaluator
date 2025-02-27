import { Box, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";

const NotationGuide = () => {
  const cardNotations = useMemo(
    () => [
      { symbol: "♠ (S)", suit: "Spades", example: "AS (Ace of Spades)" },
      { symbol: "♥ (H)", suit: "Hearts", example: "10H (10 of Hearts)" },
      { symbol: "♦ (D)", suit: "Diamonds", example: "7D (7 of Diamonds)" },
      { symbol: "♣ (C)", suit: "Clubs", example: "4C (4 of Clubs)" },
    ],
    []
  );

  return (
    <Box w="100%">
      <Heading size="md" mb={2}>
        Card Notation Guide
      </Heading>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Enter cards using this format: <b>AS 10H 7D 4C 2S</b>, where:
      </Text>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid gray" }}>
            <th style={{ padding: "8px" }}>Symbol</th>
            <th style={{ padding: "8px" }}>Suit</th>
            <th style={{ padding: "8px" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {cardNotations.map(({ symbol, suit, example }) => (
            <tr key={symbol}>
              <td style={{ padding: "8px" }}>{symbol}</td>
              <td style={{ padding: "8px" }}>{suit}</td>
              <td style={{ padding: "8px" }}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default NotationGuide;
