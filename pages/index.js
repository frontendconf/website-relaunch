import App from "../components/App";
import Header from "../components/Header";
import Content from "../components/Content";
import Footer from "../components/footer/Footer";
import "../styles/main.scss";

export default ({ host }) => {
  return (
    <App>
      <Header />
      <Content host={host} />
      <Footer />
    </App>
  );
};
