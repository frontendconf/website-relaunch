import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import ErrorMessage from './ErrorMessage'

export const allPagesQuery = gql`
  query allPages {
    pageCollection {
      items {
        title
        slug
      }
    }
  }
`

export default function PagesList () {
  return (
    <Query query={allPagesQuery}>
      {({ loading, error, data: { pageCollection: { items }} }) => {
        if (error) return <ErrorMessage message='Error loading pages.' />
        if (loading) return <div>Loading</div>

        return (
          <section>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <a href={`https://frontendconf.ch/${item.slug}`}>{item.title}</a>
                  </div>
                </li>
              ))}
            </ul>
            <style jsx>{`
              ul {
                margin: 0;
                padding: 0;
              }
              li {
                display: block;
                margin-bottom: 10px;
              }
            `}</style>
          </section>
        )
      }}
    </Query>
  )
}
