import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import PokerHandEvaluator from "./container/PokerHandEvaluator/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider>
        <PokerHandEvaluator />
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
