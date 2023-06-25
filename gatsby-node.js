const { postSlug } = require("./src/utils/slugExpression");
const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type node__blog_post implements Node {
      field_blog_post_subtitle: String
    }
  `;
  createTypes(typeDefs);
};

async function createTags({ graphql, actions }) {
  const { errors, data } = await graphql(`
    {
      allNodeBlogPost {
        nodes {
          relationships {
            field_blog_post_tags {
              name
            }
          }
        }
      }
    }
  `);

  data.allNodeBlogPost.nodes.forEach((post) => {
    post.relationships.field_blog_post_tags.forEach((tag) => {
      const tagSlug = postSlug(tag.name);
      actions.createPage({
        path: `/tag/${tagSlug}`,
        component: path.resolve(`src/templates/tag-template.js`),
        context: {
          tag: tag.name,
        },
      });
    });
  });
}

// This funtion create posts of blog page
async function createBlogPosts({ graphql, actions }) {
  const { errors, data } = await graphql(`
    query getTotalNodePosts {
      allNodeBlogPost {
        nodes {
          title
          created(formatString: "MMMM DD, YYYY")
          relationships {
            field_blog_post_tags {
              name
            }
          }
        }
      }
    }
  `);
  data.allNodeBlogPost.nodes.forEach((post) => {
    const slugTag = postSlug(post.title);
    const tagNames = post.relationships.field_blog_post_tags.map(
      (tag) => tag.name
    );
    actions.createPage({
      path: `/blog/${slugTag}`,
      component: path.resolve(`src/templates/blog-post.js`),
      context: {
        title: post.title,
        created: post.created,
        tags: tagNames,
        limit: 6,
        date: post.created,
      },
    });
  });
  return;
}

// This funtion create pages of blog page
async function createBlogPages({ graphql, actions }) {
  const { errors, data } = await graphql(`
    query getTotalNodePosts {
      allNodeBlogPost {
        totalCount
        nodes {
          field_blog_post_subtitle
        }
      }
    }
  `);

  const { totalCount: posts } = data.allNodeBlogPost;
  const postsPerPage = 9;
  const numPages = Math.ceil(posts / postsPerPage);

  // Each page, use the createPages api to dynamically create that page
  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("src/templates/blog-page.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  return;
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createBlogPages({ graphql, actions }),
    createBlogPosts({ graphql, actions }),
    createTags({ graphql, actions }),
  ]);
};

/* exports.onCreateDevServer = ({ app }) => {
  app.use('/api', sendEmail);
}; */
