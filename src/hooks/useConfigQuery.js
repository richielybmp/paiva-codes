import { useStaticQuery, graphql } from "gatsby"

export const useConfigQuery = () => {
    const data = useStaticQuery(graphql`
    query ConfigQuery {
        markdownRemark(frontmatter: {type: {eq: "config"}}) {
          frontmatter {
            logo {
              publicURL
            }
            menu {
              id
              link
              name
            }
          }
        }
      }         
  `)

    console.log(data);
    return data.markdownRemark.frontmatter
}