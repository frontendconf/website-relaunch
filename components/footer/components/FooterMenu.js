import Link from "next/link";

export default function FooterMenu(props) {
  return (
    <div className={`menu menu--${props.id}`}>
      <ul className="menu__list">
        {props.items.map((item, i) => {
          const id = item.sys ? item.sys.id : i;

          return item.slug ? (
            <li className="menu__list-item" key={id}>
              <Link
                href={{ pathname: "/", query: { slug: item.slug } }}
                as={`/${item.slug}`}
              >
                <a className="menu__link">{item.title}</a>
              </Link>
            </li>
          ) : (
            <li className="menu__list-item" key={id}>
              <a className="menu__link" href={item.link}>
                {item.logo ? (
                  <img src={item.logo.url} alt={item.title} />
                ) : (
                  item.title
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  )
};