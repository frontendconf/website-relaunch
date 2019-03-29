export const Container = ({ children, wide = false }) => (
  <div className={`container ${wide ? "container--wide" : ""}`}>{children}</div>
);

export const Row = ({ children, key }) => <div className={"row"} key={key}>{children}</div>;

export const Col = ({ className, children }) => (
  <div className={`col ${className ? className : ""}`}>{children}</div>
);

export default {
  Container,
  Row,
  Col
};
