import { grid } from '../styles/variables';

export const Container = ({ children, wide = false }) => (
  <div className={`container ${wide ? 'container--wide' : ''}`}>
    {children}
    <style jsx>{`
      .container {
        max-width: 1680px;
        padding-right: 16px;
        padding-left: 16px;
      }

      @media (min-width: 400px) {
        .container {
          padding-right: 32px;
          padding-left: 32px;
        }
      }

      @media (min-width: 768px) {
        .container {
          padding-right: 64px;
          padding-left: 64px;
        }
        .container--wide {
          padding-right: 32px;
          padding-left: 32px;
        }
      }

      @media (min-width: 1280px) {
        .container {
          padding-right: 200px;
          padding-left: 200px;
        }
        .container--wide {
          padding-right: 56px;
          padding-left: 56px;
        }
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

export const Col = ({ className, children }) => (
  <div className={`col ${className ? className : ''}`}>
    {children}
    <style jsx>{`
      .col {
        min-height: 1px;
        padding-right: ${grid.gutter / 2}px;
        padding-left: ${grid.gutter / 2}px;
      }
      .xs-1 {
        flex: 0 0 ${100 / grid.columns * 1}%;
        max-width: ${100 / grid.columns * 1}%;
      }
      .xs-12 {
        flex: 0 0 ${100 / grid.columns * 12}%;
        max-width: ${100 / grid.columns * 12}%;
      }
    `}</style>
  </div>
);

export default {
  Container,
  Row,
  Col
}