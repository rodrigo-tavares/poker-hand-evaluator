import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const ThemeWrapper = ({ children }: Props) => (
  <ChakraProvider value={defaultSystem}>
    <ThemeProvider>{children}</ThemeProvider>
  </ChakraProvider>
);
