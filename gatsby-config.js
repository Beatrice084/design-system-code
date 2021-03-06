module.exports = {
  pathPrefix: `/design-system-code`,
  siteMetadata: {
    title: 'Aurora',
    langs: ['en', 'fr'],
    defaultLangKey: 'en'
  },
  plugins: [

    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // 'gatsby-plugin-eslint', STILL INSTALLED
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/docs/`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 740,
            },
          },
        ],
      },
    },

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 10
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/src/img/`
      }
    },
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: 'en',
            // A function for filtering nodes. () => true by default
            filterNodes: node => {
              if (node.frontmatter !== undefined) {
                if (node.frontmatter.lang === "en") {
                  return true;
                }
              }
              return false;
            }
            // Add to index custom entries, that are not actually extracted from gatsby nodes
            //customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
          },
          {
            name: 'fr',
            filterNodes: node => {
              if (node.frontmatter !== undefined) {
                if (node.frontmatter.lang === "fr") {
                  return true;
                }
              }
              return false;
            }
          }
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'title', store: true, attributes: { boost: 30 } },
          { name: 'path', store: true },

        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            path: node => node.frontmatter.path,
          },
        },
      },
    },
  ],

}
