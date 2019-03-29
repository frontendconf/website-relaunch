export default ({ speaker }) => {
	return (
		<>
			<div className="speaker">
				<div className="speaker__image-wrapper">
					<img width="294" height="395" src={speaker.photo.url}/>
				</div>
				<div>{speaker.name}</div>
				<div>{speaker.description}</div>
			</div>
		</>
	);
};
