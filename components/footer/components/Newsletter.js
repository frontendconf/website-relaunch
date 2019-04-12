export default function Newsletter(props) {
  return (
    <div className={`newsletter ${props.className || ""}`}>
      <h3>Sign up for the newsletter</h3>
      <form
        className="newsletter__form"
        action="//frontendconf.us2.list-manage.com/subscribe/post?u=d6e0840333568eaec22d009ab&amp;id=d822473667"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
      >
        <label>
          <span className="newsletter__label">
            Fill in your email here to subscribe to the newsletter
          </span>
          <input
            className="newsletter__input"
            name="EMAIL"
            id="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <button type="submit" className="newsletter__submit">
          Go
        </button>
      </form>
    </div>
  );
}
