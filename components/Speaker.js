import Link from "next/link";
import Image from './Image';

export default ({ speaker }) => {
  return (
    <Link
      href={{ pathname: "/speakers", query: { slug: speaker.slug } }}
      as={`/speakers/${speaker.slug}`}
    >
      <a className="speaker">
        <div className="speaker__image-wrapper">
          <Image className="speaker__image"
            src={`${speaker.photo.url}&w=295&h=395`}
            srcSet={`
              ${speaker.photo.url}&w=200&h=269 200w,
              ${speaker.photo.url}&w=300&h=403 300w,
              ${speaker.photo.url}&w=400&h=538 400w,
              ${speaker.photo.url}&w=500&h=673 500w,
              ${speaker.photo.url}&w=600&h=807 600w
            `}
            // TODO: Set more acccurate sizes
            sizes={`
              (min-width: 600px) 290px,
              40vw
            `}
          />
        </div>
        <p className="speaker__name">{speaker.name}</p>
        <p className="speaker__description">{speaker.description}</p>
      </a>
    </Link>
  );
};
