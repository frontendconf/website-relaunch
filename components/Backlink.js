import Link from "next/link";
import { Container } from './shared/Grid';

export default function Backlink({ link, text, className = '' }) {
  return (
    <div className={`backlink ${className}`}>
      <Container wide={true}>
        <Link {...link}>
          <a className="backlink__link">
            <span className="backlink__icon-wrapper">
              <span className="backlink__icon"></span>
            </span>
            <span className="backlink__text-wrapper">{text}</span>
          </a>
        </Link>
      </Container>
    </div>
  )
}
