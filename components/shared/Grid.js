import css from 'styled-jsx/css';
import { grid } from '../styles/variables';

export const Container = ({ children, wide = false }) => (
  <div className={wide ? 'container container--wide' : 'container'}>
    {children}
    <style jsx>{`
      .container {
        max-width: 1680px;
        padding-right: 200px; // TODO: all responsive adjustments
        padding-left: 200px; // TODO: all responsive adjustments
      }
      .container--wide {
        padding-right: 60px; // TODO: all responsive adjustments
        padding-left: 60px; // TODO: all responsive adjustments
      }
    `}</style>
  </div>
);

export const Row = ({ children }) => (
  <div className={'row'}>
    {children}
    <style jsx>{`
      .row {
        display: flex;
        margin-right: -${grid.gutter / 2}px;
        margin-left: -${grid.gutter / 2}px;
      }
    `}</style>
  </div>
);

const yolo = (bp) => {
  let result = '';
  
  // Add media quiery if necessary
  if(bp.minWidth !== 0) {
    result += `
      @media screen and (min-width: ${bp.minWidth}px) {
    `;
  }

  for (let i = 1; i <= 1; i++) {
    result += `
      .col-${bp.name}-${i} {
        flex: 0 0 ${100 / grid.columns * i}%;
        max-width: ${100 / grid.columns * i}%;
      }
    `;
  }

  // Add ending bracket of media quiery if necessary
  if(bp.minWidth !== 0) {
    result += ` } `;
  }

  return result;
}

const { className, styles } = css.resolve`${grid.breakpoints.map(yolo).join('')}`;

export const Col = ({ children }) => (
  <div className={'col col-xs-12 ' + className}>
    {children}
    {styles}
  </div>
);

export default {
  Container
}