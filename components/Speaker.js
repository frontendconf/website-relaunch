import Link from "next/link";

export default ({ speaker }) => {
	return (
			<Link
				href={{ pathname: "/speakers", query: { slug: speaker.slug } }}
				as={`/speakers/${speaker.slug}`}
			>
				<a className="speaker">
					<div className="speaker__image-wrapper">
						<img width="294" height="395" src={speaker.photo.url}/>
					</div>
					<div className="speaker__name">{speaker.name}</div>
					<div className="speaker__position">{speaker.description}</div>
				</a>
			</Link>
	);
};
