import React from "react";
import PropTypes from "prop-types";
import Twitter from "../static/twitter.svg";
import Linkedin from "../static/linkedin.svg";
import Website from "../static/website.svg";
import Facebook from "../static/facebook.svg";
import Instagram from "../static/instagram.svg";

const Socials = ({ items, mobileVertical, className }) => (
  <div
    className={`socials ${className} ${
      mobileVertical ? "socials--mobile-vertical" : ""
    }`}
  >
    <ul className="socials__list">
      {items.map(({ url, icon, a11y }) => (
        <li key={url} className="socials__list-item">
          <a
            className="socials__link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={a11y}
          >
            {icon === "twitter" && <Twitter />}
            {icon === "linkedin" && <Linkedin />}
            {icon === "website" && <Website />}
            {icon === "facebook" && <Facebook />}
            {icon === "instagram" && <Instagram />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

Socials.propTypes = {
  items: PropTypes.array,
  mobileVertical: PropTypes.bool,
  className: PropTypes.string
};

// Same approach for defaultProps too
Socials.defaultProps = {
  items: [],
  mobileVertical: false,
  className: ""
};

export default Socials;
