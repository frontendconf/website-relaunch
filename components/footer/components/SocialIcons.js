import React from "react";
import TwitterIcon from "../../../static/socials/sc-twitter.svg";
import FacebookIcon from "../../../static/socials/sc-facebook.svg";
import FlickrIcon from "../../../static/socials/sc-flickr.svg";
import VimeoIcon from "../../../static/socials/sc-vimeo.svg";
import YouTubeIcon from "../../../static/socials/sc-youtube.svg";
import LinkedInIcon from "../../../static/socials/sc-linkedin.svg";

export default function SocialMenu(props) {
  return (
    <div className={`social-menu`}>
      <ul className="social-menu__list">
        {props.items.map((item, i) => {
          const id = item.sys ? item.sys.id : i;

          let Icon;

          switch (item.title) {
            case "Twitter":
              Icon = TwitterIcon;
              break;
            case "Facebook":
              Icon = FacebookIcon;
              break;
            case "Flickr":
              Icon = FlickrIcon;
              break;
            case "Vimeo":
              Icon = VimeoIcon;
              break;
            case "YouTube":
              Icon = YouTubeIcon;
              break;
            case "LinkedIn":
              Icon = LinkedInIcon;
              break;
          }

          return (
            <li className="social-menu__list-item" key={id}>
              <a
                className="social-menu__link"
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
                title={item.title}
              >
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
