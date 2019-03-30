export const Container = ({ className, children, wide = false }) => (
  <div className={`container ${className ? className : ""} ${wide ? "container--wide" : ""}`}>{children}</div>
);

export const Row = ({ className, children, hGutter = false }) => (
  <div className={`row ${className ? className : ""} ${hGutter ? "row--horizontal-gutters" : ""}`}>{children}</div>
);

export const Col = ({ className, children }) => (
  <div className={`col ${className ? className : ""}`}>{children}</div>
);

export default {
  Container,
  Row,
  Col
};
