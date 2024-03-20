// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { MathJaxContext } from "better-react-mathjax";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <MathJaxContext>{children}</MathJaxContext>
    </ChakraProvider>
  );
}
