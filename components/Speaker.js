import Link from "next/link";

export default ({ speaker }) => {
	return (
		<Link
			href={{ pathname: "/speakers", query: { slug: speaker.slug } }}
			as={`/speakers/${speaker.slug}`}
		>
			<a className="speaker">
				<div className="speaker__image-wrapper">
					<img className="speaker__image" srcSet={`${speaker.photo.url}&w=295&h=395 1x, ${speaker.photo.url}&w=590&h=890 2x`}/>
				</div>
				<p className="speaker__name">{speaker.name}</p>
				<p className="speaker__description">{speaker.description}</p>
			</a>
		</Link>
	);
};
