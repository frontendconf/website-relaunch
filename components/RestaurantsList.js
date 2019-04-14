import { Query } from "react-apollo";
import gql from "graphql-tag";
import ErrorMessage from "./ErrorMessage";
import { Row, Col } from "./shared/Grid";
import FadeIn from "./FadeIn";
import Image from "./Image";

const RestaurantQuery = gql`
  query {
    restaurantCollection {
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

const RestaurantsList = () => (
  <div className="restaurants">
    <Row>
      <Col className="xs-12 lg-10 offset-lg-1">
        <h2 className="restaurants__title">Eating & Drinking in Zürich</h2>
        <p className="restaurants__text">
          Handpicked recommendations from our staff!
        </p>

        <Query query={RestaurantQuery} skip={!process.browser}>
          {({ loading, error, data }) => {
            if (error) return <ErrorMessage message="Error loading pages." />;
            if (loading) return <div>Loading</div>;
            if (!data) return null;

            const restaurants = data.restaurantCollection.items;

            return (
              <div className="restaurants__list">
                <Row>
                  {restaurants.map((restaurant, i) => (
                    <Col key={i} className="xs-12 rg-6 lg-3">
                      <a
                        key={i}
                        className="restaurants__link"
                        href={restaurant.link}
                        target="_blank"
                      >
                        <FadeIn style={{ display: "block" }}>
                          <div className="restaurants__image-wrapper">
                            <Image
                              className="restaurants__image"
                              src={`${restaurant.photo.url}&w=500&h=375`}
                              srcSet={`
                                ${restaurant.photo.url}&w=200&h=150 200w,
                                ${restaurant.photo.url}&w=300&h=225 300w,
                                ${restaurant.photo.url}&w=400&h=300 400w,
                                ${restaurant.photo.url}&w=500&h=375 500w,
                                ${restaurant.photo.url}&w=600&h=450 600w
                              `}
                              sizes={`
                                (min-width: 992px) 250px,
                                (min-width: 600px) 45vw,
                                95vw
                              `}
                            />
                          </div>
                        </FadeIn>
                        <FadeIn style={{ display: "block" }}>
                          <p className="restaurants__name">{restaurant.name}</p>
                          <p className="restaurants__description">
                            {restaurant.description}
                          </p>
                        </FadeIn>
                      </a>
                    </Col>
                  ))}
                </Row>
              </div>
            );
          }}
        </Query>
      </Col>
    </Row>
  </div>
);

export default RestaurantsList;
