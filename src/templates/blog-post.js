import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import styled from "styled-components";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { SEO } from "../components/seo";
import SimilarPost from "../components/SimilarPost";
import { readingTime } from "../utils/readingTime";
import { postSlug } from "../utils/slugExpression";
const slugify = require("slugify");

const BlogPost = ({ data, pageContext }) => {
  const {
    title,
    field_blog_post_subtitle: subtitle,
    created,
    body: { value, summary },
    relationships: {
      field_header_image: { localFile },
      uid: { display_name },
      field_blog_post_tags: tags,
    },
  } = data.alias1.nodes[0];

  const main = { __html: value }; //Body
  const image = getImage(localFile); //Post Image

  const time = readingTime(value);
  return (
    <Wrapper>
      <Layout>
        <main className="main">
          <h1 className="blog-post-title">{title}</h1>
          <p className="blog-post-subtitle">{subtitle}</p>
          <div className="blog-post-header-image">
            <GatsbyImage
              image={image}
              alt={"Post image of " + title}
              className="gatsby-image-header"
            />
          </div>
          <section className="blog-post-container">
            <div className="blog-post-divisor-start"></div>
            <div className="blog-post-header">
              <div className="post-info">
                <p className="post-info-autor">{display_name}</p>
                <p className="post-info-data">
                  {created} · {time} min read
                </p>
                <div className="post-info-tags">
                  <div>
                    {tags.map((tag, index) => (
                      <Link
                        to={`/tag/${postSlug(tag.name)}`}
                        className="post-info-tag"
                        key={index}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <p className="blog-post-summary">{summary}</p>
              </div>
            </div>
            <div className="blog-post-body">
              <div
                className="blog-post-body-content"
                dangerouslySetInnerHTML={main}
              />
              <p>
                <br />
                Thanks for reading, <br />
                {display_name}
              </p>
            </div>
          </section>
          <div className="blog-post-divisor-end"></div>
          <SimilarPost data={data.alias2.nodes} />
        </main>
      </Layout>
    </Wrapper>
  );
};

export const Head = ({ data, pageContext }) => (
  <SEO
    title={`${data.alias1.nodes[0].title} - Decimo Technology Solutions`}
    description={`Blog post ${data.alias1.nodes[0].title} of Decimo Technology Solutions`}
  />
);

export const query = graphql`
  query ($title: String!, $limit: Int, $tags: [String!], $date: Date) {
    alias1: allNodeBlogPost(filter: { title: { eq: $title } }) {
      nodes {
        title
        field_blog_post_subtitle
        created(formatString: "MMMM DD YYYY")
        body {
          value
          summary
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
              }
            }
          }
          uid {
            display_name
          }
          field_blog_post_tags {
            name
          }
        }
      }
    }
    alias2: allNodeBlogPost(
      sort: { created: DESC }
      limit: $limit
      filter: {
        title: { ne: $title }
        relationships: {
          field_blog_post_tags: { elemMatch: { name: { in: $tags } } }
        }
        created: { lte: $date }
      }
    ) {
      nodes {
        title
        created(formatString: "MMMM DD, YYYY")
        body {
          value
          summary
        }
        relationships {
          field_header_image {
            localFile {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
          uid {
            display_name
          }
          field_blog_post_tags {
            name
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  .main {
    padding-bottom: 500px;
  }

  .blog-post-title {
    text-align: center;
    margin: 50px auto 24px auto;
    font-weight: 700;
    letter-spacing: 0.05em;
    line-height: 100%;
    max-width: 996px;
  }

  .blog-post-subtitle {
    font-weight: 400;
    line-height: 170%;
    text-align: center;
    color: #000000;
  }

  .blog-post-summary {
    margin-top: 58px;
    line-height: 170%;
  }
  .blog-post-container {
    position: relative;
    display: block;
    max-width: 996px;
    width: 100%;
    margin: 75px auto 75px auto;
  }

  .blog-post-header {
    margin-top: 29px;
  }
  .blog-post-header h1 {
    padding: 30px 0 30px 0;
    text-align: center;
  }

  .blog-post-header-image {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 457px;
    margin-top: 61px;
    margin-bottom: 61px;
  }
  .gatsby-image-header {
    width: 100%;
  }

  .blog-post-body {
    padding-top: 58px;
    font-weight: 400;
  }

  .blog-post-body-content {
    line-height: 170%;
  }

  .post-info {
    width: 100%;
  }

  .post-info-autor {
    font-weight: 700;
    line-height: 19px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #000000;
  }

  .post-info-data {
    font-weight: 400;
    line-height: 19px;
    color: #000000;
  }

  .post-info-tags {
    margin-top: 29px;
  }

  .post-info-tag {
    background-color: rgba(128, 202, 203, 0.2);
    padding: 5px 18px;
    color: #339999;
    transition: 0.3s;
    cursor: pointer;
    margin-right: 10px;
  }

  .post-info-tag:hover {
    background-color: rgba(128, 202, 203, 0.2);
    transition: 0.3s;
  }

  .blog-post-divisor-start {
    border: 2px solid #000000;
  }
  .blog-post-divisor-end {
    background: linear-gradient(89.63deg, #339999 10.13%, #ff9933 90.06%);
    height: 7px;
    width: 100%;
    margin-bottom: 85px;
  }
  @media (max-width: 1200px) {
    .blog-post-container {
      padding-left: 70px;
      padding-right: 70px;
    }
  }
  @media (max-width: 768px) {
    .blog-post-container {
      padding-left: 35px;
      padding-right: 35px;
    }

    .post-info {
      justify-content: center;
    }
  }
  @media (max-width: 576px) {
    .blog-post-title {
      padding-left: 15px;
      padding-right: 15px;
    }
    .blog-post-subtitle {
      padding-left: 15px;
      padding-right: 15px;
    }

    .blog-post-container {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export default BlogPost;
