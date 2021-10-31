import React from "react"
import { graphql } from "gatsby"

// Components
//import SEO from "components/SEO"

import Layout from "components/Layout"
import HomeBanner from "components/HomeBanner"
import BlogPostCard from "components/BlogPostCard"

const IndexPage = ({ data }) => {
    console.log(data)
    return (
        <Layout>
            <HomeBanner />
            <main>
                <BlogPostCard />
            </main>
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
query PostListQuery {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      edges {
        node {
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            date
            title
            image {
                childImageSharp {
                    fluid(maxWidth: 200, maxHeight: 200) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
          }
          excerpt
        }
      }
    }
  }
`
