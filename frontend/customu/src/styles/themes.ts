import { Palette } from './colors'
import { extendTheme } from "@chakra-ui/react";

export const Color = {
  DANGER: Palette.RED_500,
  BORDER: Palette.GRAY_200,
  TEXT_DISABLED: Palette.GRAY_300,
  TEXT_GRAY: Palette.GRAY_500,
  TEXT_BLACK: Palette.GRAY_700,
  BACKGROUND: Palette.GRAY_50,
  BACKGROUND_WHITE: Palette.GRAY_0,
  BACKGROUND_GRAY: Palette.GRAY_100,
  TEXT_LINK: Palette.BLUE_500,
  TEXT_WHITE: Palette.GRAY_0,
  PRIMARY_0: Palette.TEAL_600,
  BRAND_0: Palette.BRAND_0,
  BRAND_0_HOVER: Palette.GRAY_50,
  HEADER: Palette.GRAY_600,
  HELP_HEADER: Palette.TEAL_600,
}

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "green.50",
        color: "green.800"
      }
    }
  }
});

export enum Depth {
  HEADER = 100,
  HEADER_MENU = 110,
}