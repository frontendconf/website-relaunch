import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import FadeIn from "./FadeIn";
import Image from "./Image";

const HotelQuery = gql`
  query {
    hotelCollection {
      items {
        name
        description
        link
        photo {
          url(transform: { width: 600, height: 600, resizeStrategy: FILL })
        }
      }
    }
  }
`;

const HotelsList = () => (
  <div className="hotels">
    <Row>
      <Col className="xs-12 lg-10 offset-lg-1">
        <h2 className="hotels__title">Sleeping in Zurich</h2>
        <p className="hotels__text">
          You can book approximately 200 hotels free of charge through Zurich
          Tourism – online or by telephone. The range includes everything from
          youth hostels to luxury hotels, rooms in the center of the Old Town,
          on the edge of Lake Zurich, or in one of Zurich’s trendy districts.
        </p>

        <Query query={HotelQuery} skip={!process.browser}>
          {({ loading, error, data }) => {
            if (error) return <ErrorMessage message="Error loading pages." />;
            if (loading) return <div>Loading</div>;
            if (!data) return null;

            const hotels = data.hotelCollection.items;

            return (
              <div className="hotels__list">
                {hotels.map((hotel, i) => (
                  <a
                    key={i}
                    className="hotels__link"
                    href={hotel.link}
                    target="_blank"
                  >
                    <Row>
                      <Col className="xs-12 rg-6 md-4 lg-3">
                        <FadeIn style={{ display: "block" }}>
                          <div className="hotels__image-wrapper">
                            <Image
                              className="hotels__image"
                              src={`${hotel.photo.url}&w=500&h=375`}
                              srcSet={`
                                ${hotel.photo.url}&w=200&h=150 200w,
                                ${hotel.photo.url}&w=300&h=225 300w,
                                ${hotel.photo.url}&w=400&h=300 400w,
                                ${hotel.photo.url}&w=500&h=375 500w,
                                ${hotel.photo.url}&w=600&h=450 600w
                              `}
                              sizes={`
                                (min-width: 992px) 250px,
                                (min-width: 600px) 45vw,
                                95vw
                              `}
                            />
                          </div>
                        </FadeIn>
                      </Col>
                      <Col className="xs-12 rg-6 md-8 lg-9">
                        <FadeIn style={{ display: "block" }}>
                          <p className="hotels__name">{hotel.name}</p>
                          <p className="hotels__description">
                            {hotel.description}
                          </p>
                        </FadeIn>
                      </Col>
                    </Row>
                  </a>
                ))}
              </div>
            );
          }}
        </Query>
      </Col>
    </Row>
  </div>
);

export default HotelsList;
