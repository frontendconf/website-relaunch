export default ({ speaker }) => {
	return (
		<div className="speaker">
			<div className="speaker__image-wrapper">
				<img className="speaker__image" src={speaker.photo.url}/>
			</div>
			<p className="speaker__name">{speaker.name}</p>
			<p className="speaker__description">{speaker.description}</p>
		</div>
	);
};
