import PropTypes from "prop-types";
import Markdown from "markdown-to-jsx";
import { Container, Row, Col } from "./shared/Grid";
import { SpeakerImage, SpeakerSocials } from "./speaker/SpeakerLink";

const Workshop = ({ workshop }) => {
  return (
    <Container className="workshop">
      <Row className="content__floating-row">
        <Col className="content__left xs-12 md-7 lg-6 offset-lg-1">
          <div className="content-title">
            <h1 className="content-title__title">{workshop.title}</h1>
          </div>
        </Col>
        {workshop.teacher ? (
          <Col className="content__right xs-12 sm-10 rg-8 md-4 offset-right-lg-1 lg-3">
            <Row>
              <Col className="xs-7 offset-xs-1 md-12 offset-md-0">
                <SpeakerImage speaker={workshop.teacher} />
                <h3 className="workshop__teacher-name">
                  {workshop.teacher.name}
                </h3>
                <p className="workshop__teacher-description">
                  {workshop.teacher.description}
                </p>
              </Col>
              <Col className="xs-3 offset-xs-1 md-12 offset-md-0">
                <SpeakerSocials speaker={workshop.teacher} />
              </Col>
            </Row>
          </Col>
        ) : null}
        <Col className="content__left xs-12 md-7 lg-6 offset-lg-1">
          <div>
            {workshop.body ? (
              <div className="markdown-wrapper">
                <Markdown options={{ forceBlock: true }}>
                  {workshop.body}
                </Markdown>
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Workshop.propTypes = {
  workshop: PropTypes.object
};

Workshop.defaultProps = {
  workshop: null
};

export default Workshop;
