import {
  extendTheme,
  withDefaultSize,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fontFamilies = [
  // "-apple-system",
  // "BlinkMacSystemFont",
  // `"Segoe UI"`,
  "Helvetica Neue",
  "Helvetica",
  "Arial",
  "Meiryo",
  `"Hiragino Sans"`,
  `"Hiragino Kaku Gothic ProN"`,
  "sans-serif",
  `"Apple Color Emoji"`,
  `"Segoe UI Emoji"`,
  `"Segoe UI Symbol"`,
];

const monoFontFamilies = [
  "SFMono-Regular",
  "Menlo",
  "Monaco",
  "Consolas",
  `"Liberation Mono"`,
  `"Courier New"`,
  "monospace",
];

const fonts = {
  heading: fontFamilies.join(","),
  body: fontFamilies.join(","),
  mono: monoFontFamilies.join(","),
};

export const theme = extendTheme(
  { config, fonts },
  withDefaultSize({
    size: "sm",
    components: ["Input", "NumberInput", "Select", "Button"],
  })
);
