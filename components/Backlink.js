import Link from "next/link";
import { Container } from "./shared/Grid";

export default function Backlink({ link, text, className = "" }) {
  return (
    <div className={`backlink ${className}`}>
      <Container wide={true}>
        <Link {...link}>
          <a className="backlink__link">
            <span className="backlink__icon-wrapper">
              <span className="backlink__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 40">
                  <path
                    fill="currentColor"
                    d="M20.846.792a1.214 1.214 0 0 1 1.717.07l6.12 6.655a1.215 1.215 0 0 1-.071 1.716L16.718 20.165l11.894 10.933c.494.454.526 1.222.072 1.715l-6.121 6.659a1.215 1.215 0 0 1-1.712.076L.68 21.174a1.216 1.216 0 0 1-.005-1.791L20.846.792z"
                  />
                </svg>
              </span>
            </span>
            <span className="backlink__text-wrapper">{text}</span>
          </a>
        </Link>
      </Container>
    </div>
  );
}
