const path = require("path")

const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'content' })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const content = await graphql(`
  {
    posts: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "post"}}}
    ) {
      edges {
        node {
          frontmatter {
            published
          }
          fields {
            slug
          }
        }
      }
    }
    pages: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "page"}}}
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
  `)
  console.log('oi', content)
  if (content.error) return;

  const allPosts = content.data.posts.edges;
  const allPages = content.data.pages.edges;

  allPosts.forEach(({ node }) => {
    console.log('post', node.frontmatter.published)
    if (node.frontmatter.published) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/Post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    }
  })

  allPages.forEach(({ node }) => {
    console.log('page', node.fields.slug)

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Page.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}