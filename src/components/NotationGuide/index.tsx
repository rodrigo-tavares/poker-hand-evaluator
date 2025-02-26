import { Box, Heading, Text } from "@chakra-ui/react";

const NotationGuide = () => {
  return (
    <Box mt={6} w="100%">
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
          <tr>
            <td style={{ padding: "8px" }}>♠ (S)</td>
            <td style={{ padding: "8px" }}>Spades</td>
            <td style={{ padding: "8px" }}>AS (Ace of Spades)</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>♥ (H)</td>
            <td style={{ padding: "8px" }}>Hearts</td>
            <td style={{ padding: "8px" }}>10H (10 of Hearts)</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>♦ (D)</td>
            <td style={{ padding: "8px" }}>Diamonds</td>
            <td style={{ padding: "8px" }}>7D (7 of Diamonds)</td>
          </tr>
          <tr>
            <td style={{ padding: "8px" }}>♣ (C)</td>
            <td style={{ padding: "8px" }}>Clubs</td>
            <td style={{ padding: "8px" }}>4C (4 of Clubs)</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};

export default NotationGuide;
