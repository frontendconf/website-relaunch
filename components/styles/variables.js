// General styles variables

// Functions
const pxToRem = (px) => {
  return (parseInt(px, 10) / 16) + 'rem';
}

const remToPx = (rem) => {
  return (parseInt(rem, 10) * 16) + 'px';
}

export const functions = {
  pxToRem,
  remToPx,
}


// Color system
const white = '#fff';
const black = '#000';

// Theme
const primary = '#00fff8';
const secondary = '#ffda7e';

// Grays
const grayBombay = '#B3B3BC';

const grays = {
  bombay: grayBombay
};

export const colors = {
  white,
  black,
  primary,
  secondary,
  grays,
};


// Spacing
const spacer = '1rem';

export const spaces = {
  none: 0,
  // TODO: Add correct spacing values
}

// Links
//
// Style anchor elements.

// $link-color:                              theme-color("primary") !default;
// $link-decoration:                         none !default;
// $link-hover-color:                        darken($link-color, 15%) !default;
// $link-hover-decoration:                   underline !default;

// Paragraphs
//
// Style p element.

// $paragraph-margin-bottom:   1rem !default;


// Grid breakpoints
//
// Define the minimum dimensions at which your layout will change,
// adapting to different screen sizes, for use in media queries.

// $grid-breakpoints: (
//   xs: 0,
//   sm: 576px,
//   md: 768px,
//   lg: 992px,
//   xl: 1200px
// ) !default;




// Grid containers
//
// Define the maximum width of `.container` for different screen sizes.

// $container-max-widths: (
//   sm: 540px,
//   md: 720px,
//   lg: 960px,
//   xl: 1140px
// ) !default;


// Grid
const columns = 12;
const gutter = 16;

// Array for easier looping and
const breakpoints = [{
  name: 'xs',
  minWidth: 0,
}, {
  name: 'sm',
  minWidth: 400,
}, {
  name: 'md',
  minWidth: 768,
}, {
  name: 'lg',
  minWidth: 992,
}, {
  name: 'xl',
  minWidth: 1200,
}];

const makeRow = () => {
  return `
    display: flex;
    margin-right: -${grid.gutter / 2}px;
    margin-left: -${grid.gutter / 2}px;
    flex-wrap: wrap;
  `
}

const makeCol = (params) => {
  return `
    min-height: 1px;
    padding-right: ${grid.gutter / 2}px;
    padding-left: ${grid.gutter / 2}px;
  `
}

const colWidth = (width) => {
  return `
    flex: 0 0 ${100 / grid.columns * width}%;
    max-width: ${100 / grid.columns * width}%;
  `
}

export const grid = {
  columns,
  gutter,
  breakpoints,
  functions: {
    makeRow,
    makeCol,
    colWidth,
  }
}


// Typography
const family = 'Code-Pro-LC';

export const fonts = {
  families: {
    default: family
  },
  sizes: {

  },
  weights: {
    normal: 400,
    bold: 700,
  }
};


// Mixins
const gradient = () => {
  return `
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.7), #00fff8);
  `;
}

const textGradient = () => {
  return `
    ${gradient()}
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  `;
}

const button = () => {
  return `
    display: block;
    ${mixins.gradient()}
    font-size: 13px;
    text-align: center;
    color: #09001f;
    padding: 13px 15px 11px;
    border-radius: 25px;
    text-transform: uppercase;
    line-height: 1.1;
    border: 0 none;
  `;
}

export const mixins = {
  button,
  gradient,
  textGradient
}