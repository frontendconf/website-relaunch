export default ({ speaker }) => {
  return (
    <>
      <div className="speaker">
        <img width="200" height="200" src={speaker.photo.url} />
        <div>{speaker.name}</div>
        <div>{speaker.description}</div>
      </div>
    </>
  );
};
