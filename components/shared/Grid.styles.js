import css from "styled-jsx/css";
import { grid } from '../styles/variables';

// TODO: Maybe find a better solution, this is super ugly
export const gridStyles = grid.breakpoints.map(breakpoint => {
  return css.global`@media (min-width: ${breakpoint.minWidth}px) {
    .col {
      min-height: 1px;
      padding-right: ${grid.gutter / 2}px;
      padding-left: ${grid.gutter / 2}px;
    }

    .${breakpoint.name}-1 {
      flex: 0 0 ${100 / grid.columns * 1}%;
      max-width: ${100 / grid.columns * 1}%;
    }

    .${breakpoint.name}-2 {
      flex: 0 0 ${100 / grid.columns * 2}%;
      max-width: ${100 / grid.columns * 2}%;
    }

    .${breakpoint.name}-3 {
      flex: 0 0 ${100 / grid.columns * 3}%;
      max-width: ${100 / grid.columns * 3}%;
    }

    .${breakpoint.name}-4 {
      flex: 0 0 ${100 / grid.columns * 4}%;
      max-width: ${100 / grid.columns * 4}%;
    }

    .${breakpoint.name}-5 {
      flex: 0 0 ${100 / grid.columns * 5}%;
      max-width: ${100 / grid.columns * 5}%;
    }

    .${breakpoint.name}-6 {
      flex: 0 0 ${100 / grid.columns * 6}%;
      max-width: ${100 / grid.columns * 6}%;
    }

    .${breakpoint.name}-7 {
      flex: 0 0 ${100 / grid.columns * 7}%;
      max-width: ${100 / grid.columns * 7}%;
    }

    .${breakpoint.name}-8 {
      flex: 0 0 ${100 / grid.columns * 8}%;
      max-width: ${100 / grid.columns * 8}%;
    }

    .${breakpoint.name}-9 {
      flex: 0 0 ${100 / grid.columns * 9}%;
      max-width: ${100 / grid.columns * 9}%;
    }

    .${breakpoint.name}-10 {
      flex: 0 0 ${100 / grid.columns * 10}%;
      max-width: ${100 / grid.columns * 10}%;
    }

    .${breakpoint.name}-11 {
      flex: 0 0 ${100 / grid.columns * 11}%;
      max-width: ${100 / grid.columns * 11}%;
    }

    .${breakpoint.name}-12 {
      flex: 0 0 ${100 / grid.columns * 12}%;
      max-width: ${100 / grid.columns * 12}%;
    }
  }`;
});